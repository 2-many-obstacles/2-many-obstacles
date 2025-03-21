import * as React from "react";
import Map, { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { NavigationBox } from "@/components/NavigationBox";
import Help from '../components/Help';
import { Route } from "@/components/Route";
import { Timeline } from "@/components/Timeline";

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg";

const useGeolocation = () => {
  const [position, setPosition] = React.useState<GeolocationPosition>();

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return position;
}

export default function App() {
  const mapRef = React.useRef<MapRef>(null);
  const [route, setRoute] = React.useState<any>();

  const geolocation = useGeolocation();
  const onMapLoad = React.useCallback(() => {
    if (!geolocation)
      return;
    mapRef.current?.flyTo({center: [geolocation.coords.longitude, geolocation.coords.latitude], zoom: 9, speed: 5});
  }, [geolocation]);
  
  return (
    <div className='w-full h-screen'>
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Help />
        <NavigationBox onNavigate={route => {setRoute(route)}}/>
        {route && <Route route={route} />}
        {route && <Timeline route={route} onHover={console.log} />}
      </Map>
    </div>
  );
}
