import NavigationButtons from "./navigation_buttons";
import { useState } from "react";

export default function SurfaceType(props: { onSubmit: (next: boolean, surfaceType: string) => void }) {
  const [surfaceType, setSurfaceType] = useState<string>('sett')
  const surfaceTypeOptions = [
    { value: "concrete:lanes", name: "Paved", description: "eg. asphalt, concrete" },
    { value: "sett", name: "Paving Stones", description: "usually possible with wheel chair (recommended)" },
    { value: "cobblestone", name: "Cobble Stone", description: "difficult for wheel chairs and people with limited mobility" },
    { value: "wood", name: "Metal or Wood", description: "" },
    { value: "compacted", name: "Unpaved", description: "" },
    { value: "pebblestone", name: "Gravel", description: "" },
    { value: "grass", name: "Earth and Grass", description: "" }
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl font-black block pt-10 px-6">Minimum Surface Type</h2>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="mb-2 text-lg font-medium px-6">
          Select which type of surface should be the lowest quality type in your route:</p>
        <p className="mb-2 mt-8 text-sm font-medium"></p>
        {surfaceTypeOptions.map((option) => (
          <>
            <input
              type="radio"
              name="slope"
              id={option.value.toString()}
              value={option.value}
              checked={surfaceType === option.value}
              onChange={() => setSurfaceType(option.value)}
              className="hidden"
            />
            <label key={option.value} htmlFor={option.value.toString()} className="block w-full py-4 text-black text-center min-h-26 flex flex-col items-center justify-center" style={{ backgroundColor: surfaceType !== option.value ? 'var(--color-300)' : 'var(--color-500)', borderTop: '1px solid #9E9E9E' }}>
              <p className="text-lg font-bold">{option.name}</p>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: option.description }} />
            </label>
          </>
        ))}
      </div>
      <div>
        <NavigationButtons
          onBack={() => props.onSubmit(false, surfaceType)}
          onNext={() => props.onSubmit(true, surfaceType)}
        />
      </div>
    </div>
  );
}
