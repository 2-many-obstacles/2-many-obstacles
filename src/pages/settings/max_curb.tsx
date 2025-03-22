import NavigationButtons from "./navigation_buttons";
import { useState } from "react";

export default function MaxSlope(props: { onSubmit: (next: boolean, curb: number) => void }) {
  const [curb, setCurb] = useState<number>(0.06)
  const curbOptions = [
    { value: 0.03, display: "3 cm" },
    { value: 0.06, display: "6 cm" },
    { value: 0.1, display: "10 cm" }
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl font-black block pt-10 px-6">Maximal Curb Height</h2>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="mb-2 text-lg font-medium px-6">Select the maximal curb height
          <br />that you are comfortable with</p>
        <div className="mt-auto">
          {curbOptions.map((option) => (
            <>
              <input
                type="radio"
                name="curb"
                id={option.value.toString()}
                value={option.value}
                checked={curb === option.value}
                onChange={() => setCurb(option.value)}
                className="hidden"
              />
              <label key={option.value} htmlFor={option.value.toString()} className="block w-full py-4 text-black text-center min-h-26 flex flex-col items-center justify-center" style={{ backgroundColor: curb !== option.value ? 'var(--color-300)' : 'var(--color-500)', borderTop: '1px solid #9E9E9E' }}>
                <p className="text-lg"><b>{option.value}</b> cm</p>
              </label>
            </>
          ))}
        </div>
      </div>
      <div>
        <NavigationButtons
          onBack={() => props.onSubmit(false, curb)}
          onNext={() => props.onSubmit(true, curb)}
        />
      </div>
    </div>
  );
}
