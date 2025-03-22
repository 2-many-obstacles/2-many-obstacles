import { useMap } from 'react-map-gl/mapbox'
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo } from 'react';
import { MAPBOX_ACCESS_TOKEN } from '../pages/index';
import Openrouteservice from 'openrouteservice-js';
import { useRouter } from 'next/router';
import { GeoJSONRoute } from './Timeline';

// @ts-expect-error weird error with mapbox types
const SearchBox = dynamic(() => import('@mapbox/search-js-react').then(mod => mod.SearchBox), {
    ssr: false,
})

export const OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf6248978ef786663647a0950ff1f105ca227d';

export function NavigationBox(props: {onNavigate: (route: GeoJSONRoute) => void}) {
    const map = useMap()
    const router = useRouter();

    const { origin_lat, origin_lon, destination_lat, destination_lon } = router.query;
    const originCoords = useMemo<[number, number] | undefined>(() => {
        if (typeof origin_lon === 'string' && typeof origin_lat === 'string') {
            return [parseFloat(origin_lon), parseFloat(origin_lat)];
        }
    }, [origin_lat, origin_lon]);
    const destinationCoords = useMemo<[number, number] | undefined>(() => {
        if (typeof destination_lon === 'string' && typeof destination_lat === 'string') {
            return [parseFloat(destination_lon), parseFloat(destination_lat)];
        }
    }, [destination_lat, destination_lon]);

    useEffect(() => {
        if (!originCoords)
            return;

        if (destinationCoords) {
            const service = new Openrouteservice.Directions({ api_key: OPENROUTESERVICE_API_KEY })

            service.calculate({
                coordinates: [originCoords, destinationCoords],
                profile: 'foot-walking',
                options: {
                    avoid_features: ["fords", "ferries"],
                    profile_params: {
                        weightings: {
                            green: 0.8,
                            quiet: 1.0
                        }
                    },
                },
                format: 'geojson',
                extra_info: ['surface', 'steepness', 'waytype']
            }).then((response: GeoJSONRoute) => {
                props.onNavigate(response)
                if (response.bbox) {
                    map.current?.fitBounds(response.bbox as any, { padding: { top: 120, left: 50, right: 50, bottom: 50 } })
                }
            }).catch(console.error)
        } else {
            map.current?.flyTo({
                center: originCoords,
                speed: 3
            })
        }
    }, [originCoords, destinationCoords]);

    const updateQuery = useCallback((update: Record<string, string>) => {
        const newQuery = { ...router.query, ...update }
        router.replace({ pathname: router.pathname, query: newQuery })
    }, [router])

    return (
        <div className="flex flex-col gap-2">
            <SearchBox
                accessToken={MAPBOX_ACCESS_TOKEN}
                onRetrieve={res => {
                    const feature = res.features[0]
                    const coords = feature.geometry.coordinates as [number, number]
                    updateQuery({
                        origin: feature.properties?.name || '',
                        origin_lon: coords[0].toString(),
                        origin_lat: coords[1].toString()
                    })
                }}
                placeholder="Enter origin"
                value={router.query.origin as string | undefined}
                onChange={value => updateQuery({ origin: value })}
                options={{
                    proximity: map.current?.getCenter()
                }}
                theme={{
                    variables: {
                        colorBackground: 'white',
                        colorBackgroundHover: '#f8f9fa',
                        colorBackgroundActive: '#f1f3f5',
                        colorText: '#212529',
                        colorPrimary: '#4285F4',
                        borderRadius: '8px'
                    },
                    icons: {
                        search: originCoords ? '📍' : '🔍'
                    }
                }}
            />
            
            {originCoords && (
                <SearchBox
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    onRetrieve={async res => {
                        const feature = res.features[0]
                        const destCoords = feature.geometry.coordinates as [number, number]
                        updateQuery({
                            destination: feature.properties?.name || '',
                            destination_lon: destCoords[0].toString(),
                            destination_lat: destCoords[1].toString()
                        })
                    }}
                    placeholder="Enter destination"
                    value={router.query.destination as string | undefined}
                    onChange={value => updateQuery({ destination: value })}
                    options={{ proximity: map.current?.getCenter() }}
                    theme={{
                        variables: {
                            colorBackground: 'white',
                            colorBackgroundHover: '#f8f9fa',
                            colorBackgroundActive: '#f1f3f5',
                            colorText: '#212529',
                            colorPrimary: '#4285F4',
                            borderRadius: '8px'
                        },
                        icons: {
                            search: '🏁'
                        }
                    }}
                />
            )}
        </div>
    );
}