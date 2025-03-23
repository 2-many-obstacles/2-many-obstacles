import * as React from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { NavigationBox } from "@/components/NavigationBox";
import Help from '../components/Help';
import { Route } from "@/components/Route";
import { Timeline, GeoJSONRoute } from "@/components/Timeline";
import Router from "next/router";
import Phone from "../components/icons/Settings";
import Settings from "../components/icons/Settings";

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNtOGxmOGVvOTFhNnQya3FyZWhna2VyaTkifQ.ZsQoZSiVbz4t57vRjI3HTg";

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
        {!route && (
          <div className="absolute bottom-12 right-12">
            <Help />
          </div>
        )}
        {!route && (
          <div
          className={`absolute transition-all duration-300 bottom-12 left-12`}
          >
          <button
              onClick={() => window.location.href = '/settings'}
              className="z-999 p-4 cursor-pointer text-white rounded-full shadow-lg"
              style={{ backgroundColor: "rgb(219, 125, 75)" }}
              >
              <Settings />
          </button>
      </div>
        )}
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
