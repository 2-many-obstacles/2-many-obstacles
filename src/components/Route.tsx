import { Layer, Marker, Source, useMap } from "react-map-gl/mapbox";
import { RouteProperties } from "./Timeline";
import { use, useEffect } from "react";

export function Route(props: {
    route: GeoJSON.FeatureCollection<GeoJSON.LineString, RouteProperties>;
    highlightedStep?: number;
}) {
    const coords = props.route.features[0].geometry.coordinates;
    const startPosition = coords[0];
    const endPosition = coords[coords.length - 1];
    const steps = props.route.features[0].properties.segments[0].steps;
    const map = useMap();

    useEffect(() => {
        if (props.highlightedStep !== undefined) {
            const step = steps[props.highlightedStep];
            const stepCoords = coords[step.way_points[0]] as [number, number];
            map.current?.flyTo({ center: stepCoords, zoom: 30, speed: 1 });
        }
    });

    const stepVisuals = steps.map((step, index) => {
        const stepCoords = coords[step.way_points[0]];
        return (
            <Marker key={index} longitude={stepCoords[0]} latitude={stepCoords[1]}>
                <div className="relative">
                    {/* <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div> */}
                    <div className="w-2 h-2 bg-white rounded-full border-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </Marker>
        );
    });

    return (
        <>
            <Source id="whole_path" type="geojson" data={props.route}>
                <Layer
                    id="route"
                    type="line"
                    paint={{ "line-color": "#888", "line-width": 6 }}
                />
            </Source>
            <Marker longitude={startPosition[0]} latitude={startPosition[1]}>
                <div className="text-2xl">📍</div>
            </Marker>
            <Marker longitude={endPosition[0]} latitude={endPosition[1]}>
                <div className="text-2xl">🏁</div>
            </Marker>
            {stepVisuals}
        </>
    );
}
