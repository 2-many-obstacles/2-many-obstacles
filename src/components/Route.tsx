import { Layer, Marker, Source, useMap } from "react-map-gl/mapbox";
import { RouteProperties, SteepnessType, SurfaceType, WayType } from "./Timeline";
import { use, useEffect } from "react";

type ExtraInfoType = "surface" | "steepness" | "waytypes";

export function surfaceToStyle(surface: SurfaceType) {
  switch (surface) {
    // Unknown -- Has to be really visible e.g. red color
    case SurfaceType.Unknown:
      return {
        "line-color": "rgb(182, 6, 6)",
        "line-width": 4,
      };
    // Paved
    case SurfaceType.Asphalt:
    case SurfaceType.Concrete:
    case SurfaceType.Paved:
      return {
        "line-color": "rgb(5, 138, 5)",
        "line-width": 4,
      };
    // Paving Stones
    case SurfaceType.PavingStones:
      return {
        "line-color": "rgb(11, 229, 11)",
        "line-width": 4,
      };
    // GrassPaver
    case SurfaceType.GrassPaver:
      return {
        "line-color": "rgb(246, 250, 37)",
        "line-width": 4,
      };
    // Metal
    case SurfaceType.Metal:
      return {
        "line-color": "rgb(197, 198, 195)",
        "line-width": 4,
      };
    // Wood
    case SurfaceType.Wood:
      return {
        "line-color": "rgb(139, 69, 19)",
        "line-width": 4,
      };
    // Unpaved
    case SurfaceType.Unpaved:
      return {
        "line-color": "rgb(33, 254, 247)",
        "line-width": 4,
      };
    // Compacted Gravel
    case SurfaceType.CompactedGravel:
      return {
        "line-color": "rgb(245, 208, 121)",
        "line-width": 4,
      };
    // Natural Ground
    case SurfaceType.Ground:
    case SurfaceType.Dirt:
    case SurfaceType.Grass:
    case SurfaceType.Sand:
    case SurfaceType.Ice:
      return {
        "line-color": "color:rgb(233, 63, 63)",
        "line-width": 4,
      };
    // Gravel
    case SurfaceType.Gravel:
      return {
        "line-color": "rgb(234, 141, 59)",
        "line-width": 4,
      };
    default:
      console.log("Unknown surface type: ", surface);
      return {
        "line-color": "rgb(182, 6, 6)",
        "line-width": 4,
      };
  }
}

function steepnessToStyle(steepness: SteepnessType) {}
function waytypeToStyle(waytype: WayType) {}

function ExtraInfosVisuals(props: {
  route: GeoJSON.FeatureCollection<GeoJSON.LineString, RouteProperties>;
  selected?: ExtraInfoType;
}) {
  const selected = props.selected || "surface";
  const styling_function =
    selected === "surface"
      ? surfaceToStyle
      : selected === "steepness"
      ? steepnessToStyle
      : waytypeToStyle;
  const selectedInfo = props.route.features[0].properties.extras[selected];
  return selectedInfo.values.map((value, index) => {
    const coords = props.route.features[0].geometry.coordinates;
    const coordsWithFeature = coords.slice(value[0], value[1] + 1);
    return (
      <Source
        key={`extra-info-source-${index}`}
        id={`extra-info-source-${index}`}
        type="geojson"
        data={{
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordsWithFeature,
          },
          properties: {},
        }}
      >
        <Layer
          id={`extra-info-${index}`}
          type="line"
          paint={(styling_function as any)(value[2])}
        />
      </Source>
    );
  });
}

export function Route(props: {
  route: GeoJSON.FeatureCollection<GeoJSON.LineString, RouteProperties>;
  highlightedStep?: number;
  selectedRouteInfo?: ExtraInfoType;
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
  }, [props.highlightedStep]);

  const stepMarkers = steps.map((step, index) => {
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
      {stepMarkers}
      <ExtraInfosVisuals route={props.route} />
    </>
  );
}
