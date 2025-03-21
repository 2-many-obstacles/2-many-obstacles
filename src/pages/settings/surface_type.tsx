import { useState } from "react";
import NavigationButtons from "./navigation_buttons";

export default function SurfaceType(props : {onSubmit : (next: boolean, surfaceType: number) => void}) {
      const [surfaceType, setSurfaceType] = useState<number>(0)
    const surfaceTypeOptions = [
      { value: 0, name: "Paved", description: "eg. asphalt, concrete"},
      { value: 1, name: "Paving Stones", description: "usually possible with wheel chair (recommended)"},
      { value: 2, name: "Cobble Stone", description: "difficult for wheel chairs and people with limited mobility"},
      { value: 3, name: "Metal or Wood", description: ""},
      { value: 4, name: "Unpaved", description: ""},
      { value: 5, name: "Gravel", description: ""},
      { value: 6, name: "Earth and Grass", description: ""},
      { value: 7, name: "Allow All", description: ""}
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