export default function Outro() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-7xl h-full flex -mt-16">
        {/* Left side - QR Code */}
        <div className="w-1/2 h-full flex items-center justify-center p-8">
          <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">QR Code Placeholder</span>
          </div>
        </div>

        {/* Right side - Bullet List */}
        <div className="w-1/2 h-full flex items-center justify-center p-8">
          <ul className="space-y-6 text-4xl font-medium list-disc pl-8">
            <li>First bullet point</li>
            <li>Second bullet point</li>
            <li>Third bullet point</li>
          </ul>
        </div>
      </div>
    </div>
  );
}