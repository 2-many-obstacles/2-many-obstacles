import { useMap, Marker } from 'react-map-gl/mapbox'
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MAPBOX_ACCESS_TOKEN } from '../pages/index';
import Openrouteservice from 'openrouteservice-js';
import { useRouter } from 'next/router';
import { GeoJSONRoute } from './Timeline';

// @ts-expect-error weird error with mapbox types
const SearchBox = dynamic(() => import('@mapbox/search-js-react').then(mod => mod.SearchBox), {
    ssr: false,
})

export const OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf6248978ef786663647a0950ff1f105ca227d';

export function NavigationBox(props: {onNavigate: (route: GeoJSONRoute | undefined) => void}) {
    const map = useMap()
    const router = useRouter();
    const [specialNavigation, setSpecialNavigation] = useState(true);

    const { origin_lat, origin_lon, destination_lat, destination_lon } = router.query;
    const originCoords = useMemo<[number, number] | undefined>(() => {
        if (typeof origin_lon === 'string' && typeof origin_lat === 'string' && origin_lon && origin_lat) {
            return [parseFloat(origin_lon), parseFloat(origin_lat)];
        }
    }, [origin_lat, origin_lon]);
    const destinationCoords = useMemo<[number, number] | undefined>(() => {
        if (typeof destination_lon === 'string' && typeof destination_lat === 'string' && destination_lat && destination_lon) {
            return [parseFloat(destination_lon), parseFloat(destination_lat)];
        }
    }, [destination_lat, destination_lon]);

    useEffect(() => {
        if (!originCoords) {
            props.onNavigate(undefined)
            return;
        }

        if (destinationCoords) {
            const service = new Openrouteservice.Directions({ api_key: OPENROUTESERVICE_API_KEY })
            const useSettings = Boolean(localStorage.getItem("settings"))
            const profile = useSettings && specialNavigation ? 'wheelchair' : 'foot-walking'
            let options = {}

            if (useSettings && specialNavigation) {
                const maxSlope = parseInt(localStorage.getItem("max_slope")!)
                const maxCurb = parseFloat(localStorage.getItem("max_curb")!)
                const minWidth = parseInt(localStorage.getItem("min_width")!)
                const surfaceCondition = localStorage.getItem("surface_condition")
                const surfaceType = localStorage.getItem("surface_type")
                const avoided_features = ["ferries","steps"]
                if (!Boolean(localStorage.getItem("steps"))) {
                    avoided_features.push("steps")
                }

                options = {
                    avoid_features: avoided_features,
                    profile_params: {
                        restrictions: {
                            surface_type: surfaceType,
                            track_type: "grade1",
                            smoothness_type: surfaceCondition,
                            maximum_sloped_kerb: maxCurb,
                            maximum_incline: maxSlope,
                            minimum_width: minWidth,
                        }
                    },
                }
            } else {
                options = {
                    avoid_features: ["fords", "ferries"],
                    profile_params: {
                        
                    },
                }
            }
            console.log(options)
            console.log(profile)
            
            service.calculate({
                coordinates: [originCoords, destinationCoords],
                profile: profile,
                options: options,
                format: 'geojson',
                extra_info: ['surface', 'steepness', 'waytype']
            }).then((response: GeoJSONRoute) => {
                props.onNavigate(response)
                if (response.bbox) {
                    map.current?.fitBounds(response.bbox as [number, number, number, number], { padding: { top: 120, left: 50, right: 50, bottom: 50 } })
                }
            }).catch(console.error)
        } else {
            map.current?.flyTo({
                center: originCoords,
                zoom: 13,
                speed: 3
            })
        }
    }, [originCoords, destinationCoords, specialNavigation]);

    const updateQuery = useCallback((update: (old: any) => Record<string, string | null>) => {
        router.replace({ pathname: router.pathname, query: update(router.query) })
    }, [router])

    return (
        <div className="flex flex-col m-4 p-1 bg-white relative border-2 border-gray-100 rounded-lg">
            <SearchBox
                accessToken={MAPBOX_ACCESS_TOKEN}
                onRetrieve={res => {
                    const feature = res.features[0]
                    const coords = feature.geometry.coordinates as [number, number]
                    updateQuery(old => ({ ...old, origin: feature.properties?.name || '', origin_lon: coords[0].toString(), origin_lat: coords[1].toString() }))
                }}
                placeholder="Enter origin"
                value={router.query.origin as string | undefined}
                onChange={value => updateQuery(old => ({ ...old, origin: value }))}
                options={{
                    proximity: map.current?.getCenter()
                }}
                theme={{
                    variables: {
                        colorText: '#212529',
                        colorPrimary: '#4285F4',
                        borderRadius: '0px',
                        boxShadow: 'none'
                    },
                    icons: {
                        search: originCoords ? '📍' : '🔍'
                    }
                }}
                onClear={() => updateQuery(() => ({}))}
            />
            
            {originCoords && (
                <>
                <div className='m-1'/>
                <SearchBox
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    onRetrieve={async res => {
                        const feature = res.features[0]
                        const destCoords = feature.geometry.coordinates as [number, number]
                        updateQuery(old => ({ ...old, destination: feature.properties?.name || '', destination_lon: destCoords[0].toString(), destination_lat: destCoords[1].toString() }))
                    }}
                    placeholder="Enter destination"
                    value={router.query.destination as string | undefined}
                    onChange={value => updateQuery(old => ({ ...old, destination: value }))}
                    options={{ proximity: map.current?.getCenter() }}
                    theme={{
                        variables: {
                            colorText: '#212529',
                            colorPrimary: '#4285F4',
                            borderRadius: '0px',
                            boxShadow: 'none'
                        },
                        icons: {
                            search: '🏁'
                        },
                    }}
                    onClear={() => updateQuery(({ origin, origin_lon, origin_lat }) => ({ origin, origin_lon, origin_lat }))}
                />
                </>
            )}
            {originCoords && destinationCoords && (
                <div className="absolute -bottom-8 right-1 bg-white px-2 py-1 rounded-b-lg border-x-2 border-b-2 border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">🚶‍♂️</span>
                        <button
                            onClick={() => setSpecialNavigation(!specialNavigation)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                                specialNavigation ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                    specialNavigation ? 'translate-x-4' : 'translate-x-1'
                                }`}
                            />
                        </button>
                        <span className="text-xs text-gray-500">⚙️</span>
                    </div>
                </div>
            )}

            {originCoords && !destinationCoords && (
                <Marker longitude={originCoords[0]} latitude={originCoords[1]}>
                    <div className="text-2xl">📍</div>
                </Marker>
            )}
        </div>
    );
}