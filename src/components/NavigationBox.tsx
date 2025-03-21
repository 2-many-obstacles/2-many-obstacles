import { useMap } from 'react-map-gl/mapbox'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MAPBOX_ACCESS_TOKEN } from '../pages/index';
import Openrouteservice from 'openrouteservice-js';

// @ts-expect-error weird error with mapbox types
const SearchBox = dynamic(() => import('@mapbox/search-js-react').then(mod => mod.SearchBox), {
    ssr: false,
})

interface Origin {
    coords: [number, number] | null;
    value: string;
}

export function NavigationBox(props: {onNavigate: (route: any) => void}) {
    const map = useMap()
    const [origin, setOrigin] = useState<Origin>({ coords: null, value: '' })
    const [destinationValue, setDestinationValue] = useState('')
    
    return (
        <div className="flex flex-col gap-2">
            <SearchBox
                accessToken={MAPBOX_ACCESS_TOKEN}
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
                options={{
                    proximity: map.current?.getCenter()
                }}
            />
            
            {origin.coords && (
                <SearchBox
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    onRetrieve={async res => {
                        const feature = res.features[0]
                        const destCoords = feature.geometry.coordinates as [number, number]
                        setDestinationValue(feature.properties?.name || '')

                        const service = new Openrouteservice.Directions({ api_key: '5b3ce3597851110001cf6248978ef786663647a0950ff1f105ca227d' })

                        try {
                            const response = await service.calculate({
                                coordinates: [origin.coords, destCoords],
                                profile: 'driving-car',
                                format: 'geojson',
                            })
                            props.onNavigate(response)
                            map.current?.fitBounds(response.bbox, { padding: 200 })
                        } catch (error) {
                            window.alert(error)
                        }
                    }}
                    placeholder="Enter destination"
                    value={destinationValue}
                    onChange={setDestinationValue}
                    options={{ proximity: map.current?.getCenter() }}
                />
            )}
        </div>
    );
}