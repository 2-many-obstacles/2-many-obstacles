import { useRouter } from 'next/router';
import { useState } from 'react';

enum MessageVariant {
  STAIRS = 'stairs',
  EMOTIONAL = 'emotional',
  STREET = 'street',
  LIFT = 'lift',
  OTHER = 'other',
}

export default function CommunityPage() {
  const router = useRouter();
  const [messageSent, setMessageSent] = useState<MessageVariant|undefined>(undefined);

  const onNeedHelp = (messageVariant: MessageVariant) => {
    setMessageSent(messageVariant);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Get help from your</h1>
      <h2 className="text-5xl font-bold text-blue-900 mb-6">Community!</h2>
      <p className="text-lg font-medium text-center mb-8">
        Are you stuck? <br />
        Reach out to our community members that are nearby to help you
      </p>
      <div className="space-y-4 w-full max-w-md">
        <button 
          onClick={() => onNeedHelp(MessageVariant.STAIRS)}
          className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          🦽 I need help with stairs
        </button>
        { messageSent === MessageVariant.STAIRS && <div>
          Message sent to the people in your area.
        </div>}
        <button 
          onClick={() => onNeedHelp(MessageVariant.EMOTIONAL)}
          className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          😢 Emotional Support
        </button>
        { messageSent === MessageVariant.EMOTIONAL && <div>
          Message sent to the people in your area.
        </div>}
        <button
          onClick={() => onNeedHelp(MessageVariant.STREET)}
          className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          🏠 I need to get across the street
        </button>
        { messageSent === MessageVariant.STREET && <div>
          Message sent to the people in your area.
        </div>}
        <button
          onClick={() => onNeedHelp(MessageVariant.LIFT)}
          className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg text-lg flex items-center justify-center hover:cursor-pointer">
          🚗 I need a short lift
        </button>
        { messageSent === MessageVariant.LIFT && <div>
          Message sent to the people in your area.
        </div>}
        <div className="w-full bg-blue-100 rounded-lg p-4">
          <p className="text-center text-lg font-medium">Other</p>
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNeedHelp(MessageVariant.OTHER);
              }
            }}
            type="text"
            placeholder="Your text here..."
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        { messageSent === MessageVariant.OTHER && <div>
          Message sent to the people in your area.
        </div>}
      </div>
      <a
        href='https://www.gelbeseiten.de/suche/taxi/ort?cx=13.0962266&cy=52.3857398&umkreis=4000'
        className="mt-8 w-full max-w-md px-4 py-3 bg-yellow-400 text-black font-bold text-lg rounded-lg text-center"
      >
        Taxi in Potsdam <br />
        <span className="font-normal">Zu den Gelben Seiten</span>
      </a>
    </div>
  );
}
