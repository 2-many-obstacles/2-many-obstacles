import * as React from "react";
import Map, { MapRef, ViewState } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function App() {
  const mapRef = React.useRef<MapRef>(null);

  const onMapLoad = React.useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got location:", position);
          console.log("Map ref:", mapRef.current);
          mapRef.current?.flyTo({center: [position.coords.longitude, position.coords.latitude], zoom: 9, speed: 5});
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className='w-full h-screen'>
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        mapboxAccessToken="pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg"
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}