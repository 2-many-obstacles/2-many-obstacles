import { useState } from "react";
import NavigationButtons from "./navigation_buttons";

export default function MaxSlope(props: { onSubmit: (curb: string, next: boolean) => void }) {
  const [curb, setCurb] = useState<string>("6 cm")
  const curbOptions = [
    { value: "3 cm"},
    { value: "6 cm"},
    { value: "10 cm"},
    ];


  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Max Curb Height</h2>
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium">Select Maximum Curb Height in your route:</p>
        {curbOptions.map((option) => (
          <label key={option.value} className="block mb-2">
            <input
              type="radio"
              name="slope"
              value={option.value}
              checked={curb === option.value}
              onChange={() => setCurb(option.value)}
              className="mr-2"
            />
            {option.value}
         </label>
        ))}
      </div>
        <div>
        <NavigationButtons
          onBack={() => props.onSubmit(curb, false)}
          onNext={() => props.onSubmit(curb, true)}
        />
        </div>
    </div>
  );
}