import { useState } from "react";

export default function SurfaceCondition({ onSubmit }: { onSubmit: (next: boolean, surfaceCondition: string) => void }) {
  const [condition, setCondition] = useState<number>(2);
  const [sliderValue, setSliderValue] = useState<number>(condition);
  
  const labels = [
    "Inpassable", "Very Horrible", "Horrible", "Very Bad", "Bad", "Intermediate", "Good", "Excellent"
  ];

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <h2 className="text-lg font-bold">Surface Condition</h2>
      <div className="flex items-center space-x-4">
        <div className="relative flex flex-col items-center">
          <div className="relative w-2 h-64 bg-gradient-to-t from-red-500 to-green-500 rounded-lg"></div>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))} // Convert to number
            className="absolute w-64 transform -rotate-90 appearance-none"
            style={{
              WebkitAppearance: "none",
              appearance: "none",
              background: "transparent",
              outline: "none",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          {labels.map((label, index) => (
            <div key={index} className="text-sm text-gray-200">
              {label}
            </div>
          ))}
        </div>
      </div>
  
      <div className="flex justify-between w-full max-w-sm">
        <button className="p-2 bg-red-500 text-white rounded-lg" onClick={() => onSubmit(false, "")}>
          Back
        </button>
        <button className="p-2 bg-blue-500 text-white rounded-lg" onClick={() => onSubmit(true, "")}>
          Next
        </button>
      </div>
    </div>
  );
}
