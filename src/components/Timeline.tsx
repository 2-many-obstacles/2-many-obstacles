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

export function Timeline(props: { route: GeoJSON.FeatureCollection<GeoJSON.LineString, RouteProperties> }) {
    
}