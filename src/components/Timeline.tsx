interface RouteProperties {
    segments: {
        distance: number
        duration: number
        steps: {
            distance: number
            duration: number
            type: StepType
            instruction: string
            name: string
            way_points: [start: number, end: number]
        }[]
    }[]
    extras: {
        roadaccessrestrictions: unknown; // TODO
    }
    warnings: {
        code: number
        message: string
    }[]
    way_points: unknown; // TODO
    summary: {
        distance: number
        duration: number
    }
}

enum StepType {
    Left = 0,
    Right = 1,
    SharpLeft = 2,
    SharpRight = 3,
    SlightLeft = 4,
    SlightRight = 5,
    Straight = 6,
    EnterRoundabout = 7,
    ExitRoundabout = 8,
    UTurn = 9,
    Goal = 10,
    Depart = 11,                
    KeepLeft = 12,
    KeepRight = 13,
}

export function Timeline(props: { 
    route: GeoJSON.FeatureCollection<GeoJSON.LineString, RouteProperties>, 
    onHover: (way_points: number[]) => void,
    onClick: (way_points: number[]) => void 
}) {
    const properties = props.route.features[0].properties;
    const steps = properties.segments[0].steps;
    const totalDuration = properties.summary.duration;
    const totalDistance = properties.summary.distance;

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const formatDistance = (meters: number) => {
        if (meters >= 1000) {
            return `${(meters / 1000).toFixed(1)}km`;
        }
        return `${meters}m`;
    };

    const getDirectionIcon = (step: { type: StepType }) => {
        switch (step.type) {
            case StepType.Left:
            case StepType.SharpLeft:
            case StepType.SlightLeft:
            case StepType.KeepLeft:
                return '←';
            case StepType.Right:
            case StepType.SharpRight:
            case StepType.SlightRight:
            case StepType.KeepRight:
                return '→';
            case StepType.UTurn:
                return '↩';
            case StepType.EnterRoundabout:
            case StepType.ExitRoundabout:
                return '⟳';
            case StepType.Goal:
                return '🏁';
            case StepType.Depart:
            case StepType.Straight:
            default:
                return '↑';
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-t-xl p-4 max-h-[40vh] overflow-y-auto">
            <div className="mb-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {formatDuration(totalDuration)} ({formatDistance(totalDistance)})
                    </h3>
                </div>
                {properties.warnings?.length > 0 && (
                    <div className="mt-1 flex items-center text-amber-600 text-sm">
                        <span className="mr-1">⚠️</span>
                        <span>{properties.warnings[0].message}</span>
                    </div>
                )}
            </div>
            
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <div 
                        key={index} 
                        className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer py-1" 
                        onMouseEnter={() => props.onHover(step.way_points)}
                        onClick={() => props.onClick(step.way_points)}
                    >
                        <div className="flex-shrink-0 w-6 flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {getDirectionIcon(step)}
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm text-gray-900 dark:text-white">{step.instruction}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDistance(step.distance)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}