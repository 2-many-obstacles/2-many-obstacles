import * as React from 'react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function App() {
  return (
    <Map
      // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
      mapboxAccessToken="pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg"
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}