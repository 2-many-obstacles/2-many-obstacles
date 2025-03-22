import NavigationButtons from "./navigation_buttons";
import { useState } from "react";

export default function MaxSlope(props: { onSubmit: (next: boolean, selectedSlope: number) => void }) {
  const [slope, setSlope] = useState<number>(6)
  const slopeOptions = [
    { value: 3, description: "Almost no slope. Suitable for everyone." },
    { value: 6, description: "Suitable for wheelchair users. <br><i>(recommended)</i>" },
    { value: 10, description: "Suitable for most electric wheelchairs." },
    { value: 15, description: "Challenging for most wheelchairs. <br />Only recommended with help of a supporter." },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl font-black block pt-10 px-6">Maximum Slope</h2>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="mb-2 text-lg font-medium px-6">Select the maximum feasible
          slope <br />in your route:</p>
        <div className="mt-auto">
          {slopeOptions.map((option) => (
            <>
              <input
                type="radio"
                name="slope"
                id={option.value.toString()}
                value={option.value}
                checked={slope === option.value}
                onChange={() => setSlope(option.value)}
                className="hidden"
              />
              <label key={option.value} htmlFor={option.value.toString()} className="block w-full py-4 text-black text-center min-h-26 flex flex-col items-center justify-center" style={{ backgroundColor: slope !== option.value ? 'var(--color-300)' : 'var(--color-500)', borderTop: '1px solid #9E9E9E' }}>
                <p className="text-lg font-bold">{option.value} %</p>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: option.description }} />
              </label>
            </>
          ))}
        </div>
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
