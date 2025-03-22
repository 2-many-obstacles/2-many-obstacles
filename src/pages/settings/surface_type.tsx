import { useState } from "react";
import NavigationButtons from "./navigation_buttons";

export default function SurfaceType(props : {onSubmit : (next: boolean, surfaceType: string) => void}) {
    const [surfaceType, setSurfaceType] = useState<string>("sett")
    const surfaceTypeOptions = [
      { value: "concrete", name: "Paved", description: "eg. asphalt, concrete"}, 
      { value: "sett", name: "Paving Stones", description: "usually possible with wheel chair (recommended)"},
      { value: "cobblestone", name: "Cobble Stone", description: "difficult for wheel chairs and people with limited mobility"},
      { value: "wood", name: "Metal or Wood", description: ""},
      { value: "compacted", name: "Unpaved", description: ""},
      { value: "pebblestone", name: "Gravel", description: ""},
      { value: "grass", name: "Earth and Grass", description: ""}
    ];
  
  
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold">Minimum Surface Type</h2>
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Select which type of surface should be the lowest quality type in your route:</p>
          {surfaceTypeOptions.map((option) => (
            <label key={option.value} className="block mb-2">
              <input
                type="radio"
                name="slope"
                value={option.value}
                checked={surfaceType === option.value}
                onChange={() => setSurfaceType(option.value)}
                className="mr-2"
              />
              {option.name} <span className="text-gray-600 text-sm">{option.description}</span>
            </label>
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