import * as React from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { NavigationBox } from "@/components/NavigationBox";
import Help from '../components/Help';
import { Route } from "@/components/Route";
import { Timeline, GeoJSONRoute } from "@/components/Timeline";
import Router from "next/router";

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg";

export const useGeolocation = () => {
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
  const [route, setRoute] = React.useState<GeoJSONRoute>();
  const [highlightedNavigationStep, setHighlightedNavigationStep] = React.useState<number>();
  const geolocation = useGeolocation();
  const onMapLoad = React.useCallback(() => {
    if (!geolocation)
      return;
    mapRef.current?.flyTo({center: [geolocation.coords.longitude, geolocation.coords.latitude], zoom: 14, speed: 5});
  }, [geolocation]);
  if ("localStorage" in globalThis && localStorage.getItem("settings") === null) {
    Router.push("/settings");
  }
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
        {route && <Route route={route} highlightedStep={highlightedNavigationStep} />}
        {route && <Timeline route={route} onHover={console.log} onClick={step => {setHighlightedNavigationStep(step)}} />}
        {geolocation && (
          <Source id="position" type="geojson" data={{ type: 'Point', coordinates: [geolocation.coords.longitude  , geolocation.coords.latitude] }}>
            <Layer 
              id="position" 
              type="circle" 
              source="position" 
              paint={{
                'circle-color': '#4285F4',
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.8,
                'circle-stroke-opacity': 1
              }} 
            />
          </Source>
        )}
      </Map>
    </div>
  );
}
