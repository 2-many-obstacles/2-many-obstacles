interface RouteProperties {
    segments: {
        distance: number
        duration: number
        steps: {
            distance: number
            duration: number
            type: number
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

export function Timeline(props: { route: GeoJSON.FeatureCollection<GeoJSON.LineString, RouteProperties>, onHover: (way_points: number[]) => void }) {
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

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-t-xl p-4 max-h-[40vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Route Summary</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDistance(totalDistance)} • {formatDuration(totalDuration)}
                    </p>
                </div>
            </div>
            
            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md" onMouseEnter={() => props.onHover(step.way_points)}>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center">
                            {index + 1}
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{step.instruction}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDistance(step.distance)} • {formatDuration(step.duration)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}