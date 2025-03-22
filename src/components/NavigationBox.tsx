import { useMap } from 'react-map-gl/mapbox'
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

export function NavigationBox(props: {onNavigate: (route: GeoJSONRoute) => void}) {
    const map = useMap()
    const router = useRouter();
    const [specialNavigation, setSpecialNavigation] = useState(true);

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
            const useSettings = Boolean(localStorage.getItem("settings"))
            const profile = useSettings || specialNavigation ? 'wheelchair' : 'foot-walking'
            let options = {}

            if (useSettings) {
                const maxSlope = parseInt(localStorage.getItem("max_slope")!)
                const maxCurb = parseFloat(localStorage.getItem("max_curb")!)
                const minWidth = parseInt(localStorage.getItem("min_width")!)
                const surfaceCondition = localStorage.getItem("surface_condition")
                const surfaceType = localStorage.getItem("surface_type")
                const avoided_features = ["ferries","steps"]
                if (Boolean(localStorage.getItem("steps"))) {
                    avoided_features.push("steps")
                }

                options = {
                    avoid_features: avoided_features,
                    profile_params: {
                        restrictions: {
                            surface_type: "cobblestone:flattened",
                            track_type: "grade1",
                            smoothness_type: "good",
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
                        weightings: {
                            green: 0.8,
                            quiet: 1.0
                        }
                    },
                }
            }
            
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
                speed: 3
            })
        }
    }, [originCoords, destinationCoords, specialNavigation]);

    const updateQuery = useCallback((update: Record<string, string>) => {
        const newQuery = { ...router.query, ...update }
        router.replace({ pathname: router.pathname, query: newQuery })
    }, [router])

    return (
        <div className="flex flex-col m-4 p-1 bg-white relative border-2 border-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={specialNavigation}
                        onChange={(e) => setSpecialNavigation(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Special Navigation</span>
                </label>
            </div>
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
                        colorText: '#212529',
                        colorPrimary: '#4285F4',
                        borderRadius: '0px',
                        boxShadow: 'none'
                    },
                    icons: {
                        search: originCoords ? '📍' : '🔍'
                    }
                }}
            />
            
            {originCoords && (
                <>
                <div className='m-1'/>
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
                            colorText: '#212529',
                            colorPrimary: '#4285F4',
                            borderRadius: '0px',
                            boxShadow: 'none'
                        },
                        icons: {
                            search: '🏁'
                        },
                    }}
                />
                </>
            )}
        </div>
    );
}