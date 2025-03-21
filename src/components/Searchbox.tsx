import { useMap } from 'react-map-gl/mapbox'
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SearchBox = dynamic(() => import('@mapbox/search-js-react').then(mod => mod.SearchBox), {
    ssr: false,
})

interface Origin {
    coords: [number, number] | null;
    value: string;
}

export function Searchbox() {
    const map = useMap()
    const [origin, setOrigin] = useState<Origin>({ coords: null, value: '' })
    const [destinationValue, setDestinationValue] = useState('')
    
    return (
        <div className="flex flex-col gap-2">
            <SearchBox
                accessToken="pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg"
                onRetrieve={res => {
                    const feature = res.features[0]
                    const coords = feature.geometry.coordinates as [number, number]
                    setOrigin({ coords, value: feature.properties?.name || '' })
                    map.current?.flyTo({
                        center: coords,
                        speed: 3
                    })
                }}
                placeholder="Enter origin"
                value={origin.value}
                onChange={(value) => setOrigin(prev => ({ ...prev, value }))}
            />
            
            {origin.coords && (
                <SearchBox
                    accessToken="pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg"
                    onRetrieve={res => {
                        const feature = res.features[0]
                        const destCoords = feature.geometry.coordinates as [number, number]
                        setDestinationValue(feature.properties?.name || '')
                        // Here you can implement the navigation logic between origin.coords and destCoords
                        console.log('Navigation from', origin.coords, 'to', destCoords)
                    }}
                    placeholder="Enter destination"
                    value={destinationValue}
                    onChange={setDestinationValue}
                />
            )}
        </div>
    );
}