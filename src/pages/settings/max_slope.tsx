import { useState } from "react";
import NavigationButtons from "./navigation_buttons";

export default function MaxSlope(props: { onSubmit: (next: boolean, selectedSlope: number) => void }) {
    const [slope, setSlope] = useState<number>(6)
  const slopeOptions = [
    { value: 3, description: "Almost no slope. Suitable for everyone." },
    { value: 6, description: "Suitable for wheelchair users. (recommended)" },
    { value: 10, description: "Suitable for most electric wheelchairs." },
    { value: 15, description: "Challenging for most wheelchairs. Only recommended with help of a supporter." },
  ];


  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Maximum Slope</h2>
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium">Select maximum slope in your route:</p>
        {slopeOptions.map((option) => (
          <label key={option.value} className="block mb-2">
            <input
              type="radio"
              name="slope"
              value={option.value}
              checked={slope === option.value}
              onChange={() => setSlope(option.value)}
              className="mr-2"
            />
            {option.value}% - <span className="text-gray-600 text-sm">{option.description}</span>
          </label>
        ))}
      </div>
      <div>
      <NavigationButtons
        onBack={() => props.onSubmit(false, slope)}
        onNext={() => props.onSubmit(true, slope)}
      />
      </div>
    </div>
  );
}