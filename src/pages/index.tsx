import * as React from 'react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function App() {
  return (
    <div className='w-full h-screen'>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg"
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}