import { useRouter } from 'next/router';
// test comment

export default function CommunityPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <button
        onClick={() => router.push('/')}
        className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md flex items-center"
      >
        <span>← Back to Map</span>
      </button>
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Community Support</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Need help? Our community is here to support you!</p>
        <div className="space-y-4">
          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Contact Support</h2>
            <p className="text-gray-700 dark:text-gray-300">Our support team is available 24/7 to assist you with any questions or concerns.</p>
          </div>
          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community Forums</h2>
            <p className="text-gray-700 dark:text-gray-300">Join our community forums to connect with other users and share experiences.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
