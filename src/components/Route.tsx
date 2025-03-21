import { Layer, Marker, Source } from "react-map-gl/mapbox";

export function Route(props: { route: GeoJSON.FeatureCollection<GeoJSON.LineString> }) {
    const coords = props.route.features[0].geometry.coordinates
    const start_position = coords[0]
    const end_position = coords[coords.length - 1]
    
    return (
        <>
            <Source type="geojson" data={props.route}>
                <Layer id="route" type="line" paint={{ "line-color": "#888", "line-width": 6 }} />
            </Source>
            <Marker longitude={start_position[0]} latitude={start_position[1]}>
                <div className="text-2xl">🚗</div>
            </Marker>
            <Marker longitude={end_position[0]} latitude={end_position[1]}>
                <div className="text-2xl">🏁</div>
            </Marker>
        </>
    )
}