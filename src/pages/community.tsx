import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useGeolocation } from '.';
import Openrouteservice from 'openrouteservice-js';
import { OPENROUTESERVICE_API_KEY } from '@/components/NavigationBox';

enum MessageVariant {
  STAIRS = 'stairs',
  EMOTIONAL = 'emotional',
  STREET = 'street',
  LIFT = 'lift',
  OTHER = 'other',
}

export async function getCityFromCoordinates(latitude: number, longitude: number): Promise<string | null> {
  try {
    const service = new Openrouteservice.Geocode({ api_key: OPENROUTESERVICE_API_KEY })
    const response = await service.reverseGeocode({
      point: { lat_lng: [latitude, longitude] },
    })
    const properties = response.features[0].properties;
    return properties.locality || properties.localadmin || properties.county || null;
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
}

export default function CommunityPage() {
  const router = useRouter();
  const [messageSent, setMessageSent] = useState<MessageVariant|undefined>(undefined);

  const geolocation = useGeolocation();
  const[city, setCity] = useState<string|undefined>(undefined);

  const onNeedHelp = (messageVariant: MessageVariant) => {
    setMessageSent(messageVariant);
  };

  React.useEffect(() => {
    if (geolocation) {
      getCityFromCoordinates(geolocation.coords.latitude, geolocation.coords.longitude).then((city) => {
        setCity(city??undefined);
      });
    }
  }
  , [geolocation]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center">
      <button 
          onClick={() => router.back()}
          className="text-left w-full px-4 py-3 text-blue-900 dark:text-blue-100 rounded-lg text-lg flex items-start justify-start hover:cursor-pointer">
          <svg
          className="w-6 h-6 mr-2 self-center"
          clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z" fill-rule="nonzero"/></svg>
      </button>
      <div
        className="w-full bg-gradient-to-b from-[#5A3E36] to-[#8B5E4A] relative pb-16"
        style={{ clipPath: 'ellipse(80% 100% at 50% -15%)' }}
      >
        <h1 className="text-2xl font-medium text-white text-center pt-8">Get help from your</h1>
        <h2 className="text-4xl font-bold text-white text-center">Community</h2>
      </div>
      <p className="text-lg font-medium text-center mb-8 dark:text-gray-300">
        <b>Are you stuck?</b> <br />
        Reach out to our community members that are nearby to help you.
      </p>
      <div className="space-y-4 w-full max-w-md">
        <button 
          onClick={() => onNeedHelp(MessageVariant.STAIRS)}
          className="w-full px-4 py-3 bg-[var(--button)] dark:bg-blue-700 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          🦽 I need help with stairs
        </button>
        { messageSent === MessageVariant.STAIRS && <div className="dark:text-gray-300">
          Message sent to the people in your area.
        </div>}
        <button 
          onClick={() => onNeedHelp(MessageVariant.EMOTIONAL)}
          className="w-full px-4 py-3 bg-[var(--button)] dark:bg-blue-700 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          😢 Emotional Support
        </button>
        { messageSent === MessageVariant.EMOTIONAL && <div className="dark:text-gray-300">
          Message sent to the people in your area.
        </div>}
        <button
          onClick={() => onNeedHelp(MessageVariant.STREET)}
          className="w-full px-4 py-3 bg-[var(--button)] dark:bg-blue-700 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          🏠 I need to get across the street
        </button>
        { messageSent === MessageVariant.STREET && <div className="dark:text-gray-300">
          Message sent to the people in your area.
        </div>}
        <button
          onClick={() => onNeedHelp(MessageVariant.LIFT)}
          className="w-full px-4 py-3 bg-[var(--button)] dark:bg-blue-700 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          🚗 I need a short lift
        </button>
        { messageSent === MessageVariant.LIFT && <div className="dark:text-gray-300">
          Message sent to the people in your area.
        </div>}
        <div className="space-y-0">
          <div className="w-full bg-[#E2CBB4] dark:bg-[#E2CBB4] rounded-t-lg p-4">
            <p className="text-center text-lg font-medium dark:text-gray-300">Other</p>
          </div>
          <div className="w-full bg-white dark:bg-gray-800 rounded-b-lg p-4">
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onNeedHelp(MessageVariant.OTHER);
                }
              }}
              type="text"
              placeholder="Your text here..."
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>
        { messageSent === MessageVariant.OTHER && <div className="dark:text-gray-300">
          Message sent to the people in your area.
        </div>}
      </div>
      <a
        href={'https://www.gelbeseiten.de/suche/taxi/ort?cx=' + geolocation?.coords.longitude + '&cy=' + geolocation?.coords.latitude + '&umkreis=4000'}
        target='_blank'
        className="mt-8 w-full max-w-md px-4 py-3 bg-yellow-400 dark:bg-yellow-500 text-black font-bold text-lg rounded-lg text-center"
      >
        Taxi in {city} <br />
        <span className="font-normal">To Yellow Pages</span>
      </a>
    </div>
  );
}
