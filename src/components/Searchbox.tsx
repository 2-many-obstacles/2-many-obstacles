import { useMap } from 'react-map-gl/mapbox'
import dynamic from 'next/dynamic';

const SearchBox = dynamic(() => import('@mapbox/search-js-react').then(mod => mod.SearchBox), {
    ssr: false,
})

export function Searchbox() {
    const map = useMap()
    
    return (
        <SearchBox
            accessToken="pk.eyJ1Ijoic2tuMHR0IiwiYSI6ImNrd25lM2prMjI1MGgyd21kbDRuOTRib24ifQ.JLDxqFK3HC9rKzQIBCxMWg"
            onRetrieve={res => {
                const feature = res.features[0]
                map.current?.flyTo({
                    center: feature.geometry.coordinates as [number, number],
                    speed: 3
                })
            }}
        />
    );
}