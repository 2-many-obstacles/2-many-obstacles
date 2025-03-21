import { useRouter } from 'next/router';

export default function CommunityPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => router.push('/')}
        className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md flex items-center"
      >
        <span>← Back to Map</span>
      </button>
      <h1 className="text-4xl font-bold mb-6">Community Support</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Need help? Our community is here to support you!</p>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
            <p>Our support team is available 24/7 to assist you with any questions or concerns.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Community Forums</h2>
            <p>Join our community forums to connect with other users and share experiences.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
