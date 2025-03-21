import * as React from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Searchbox } from "@/components/Searchbox";
import Help from '../components/Help';

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg";

export default function App() {
  const mapRef = React.useRef<MapRef>(null);
  const [route, setRoute] = React.useState<any>();

  const onMapLoad = React.useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          mapRef.current?.flyTo({center: [position.coords.longitude, position.coords.latitude], zoom: 9, speed: 5});
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);
  
  return (
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Help />
        <Searchbox onNavigate={route => {setRoute(route)}}/>
        {route && <Source type="geojson" data={route}>
          <Layer id="route" type="line" paint={{ "line-color": "#888", "line-width": 6 }} />
        </Source>}
      </Map>
  );
}
