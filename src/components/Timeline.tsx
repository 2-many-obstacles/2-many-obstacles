import { useState } from 'react';

interface ExtraInfo<T> {
    values: [number, number, T][];
    summary: { value: T, distance: number, duration: number }[];
}

export enum SurfaceType {
    Unknown = 0,
    Paved = 1,
    Unpaved = 2,
    Asphalt = 3,
    Concrete = 4,
    Metal = 6,
    Wood = 7,
    CompactedGravel = 8,
    Gravel = 10,
    Dirt = 11,
    Ground = 12,
    Ice = 13,
    PavingStones = 14,
    Sand = 15,
    Grass = 17,
    GrassPaver = 18,
}

export enum WayType {
    Unknown = 0,
    StateRoad = 1,
    Road = 2,
    Street = 3,
    Path = 4,
    Track = 5,
    Cycleway = 6,
    Footway = 7,
    Steps = 8,
    Ferry = 9,
    Construction = 10,
}

export enum SteepnessType {
    Decline16 = -5,
    Decline10 = -4,
    Decline7 = -3,
    Decline4 = -2,
    Decline1 = -1,
    Flat = 0,
    Incline1 = 1,
    Incline4 = 2,
    Incline7 = 3,
    Incline10 = 4,
    Incline16 = 5,
}

export interface RouteProperties {
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
        surface: ExtraInfo<SurfaceType>;
        waytypes: ExtraInfo<WayType>;
        steepness: ExtraInfo<SteepnessType>;
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

export type GeoJSONRoute = GeoJSON.FeatureCollection<GeoJSON.LineString, RouteProperties>;

export function Timeline(props: { 
    route: GeoJSONRoute, 
    onHover: (way_points: number[]) => void,
    onClick: (way_points: number) => void 
}) {
    const [isExpanded, setIsExpanded] = useState(true);
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
        <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-t-xl p-4 transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[40vh]' : 'max-h-[4rem]'} overflow-hidden`}>
            <div className="mb-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {formatDuration(totalDuration)} ({formatDistance(totalDistance)})
                    </h3>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <svg 
                            className={`w-5 h-5 text-gray-600 dark:text-gray-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {properties.warnings?.length > 0 && (
                    <div className="mt-1 flex items-center text-amber-600 text-sm">
                        <span className="mr-1">⚠️</span>
                        <span>{properties.warnings[0].message}</span>
                    </div>
                )}
            </div>
            
            <div className={`space-y-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                {steps.map((step, index) => (
                    <div 
                        key={index} 
                        className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer py-1" 
                        onMouseEnter={() => props.onHover(step.way_points)}
                        onClick={() => props.onClick(index)}
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