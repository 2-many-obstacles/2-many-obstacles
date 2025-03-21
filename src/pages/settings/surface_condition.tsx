import { useState } from "react";

export default function SurfaceCondition(props: { onSubmit: (next: boolean, condition: number) => void }) {
  const [condition, setCondition] = useState<number>(2);
  const [sliderValue, setSliderValue] = useState<number>(condition);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Surface Condition</h2>
      <p className="mb-2 text-sm font-medium">
        Select minimum width of the paths in your route:<br />
        For wheelchair users or people with limited mobility, we recommend a minimum path width of 2m.
      </p>
      <div className="flex items-center">
        <input
          type="range"
          min="1"
          max="8"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))} // Convert to number
            className="w-1/5 -rotate-90"
          />
        <span className="ml-2 text-sm">{sliderValue}m</span>
        
        <style>
            {`
            input[type="range"]::-webkit-slider-runnable-track {
              background: linear-gradient(to left, #4caf50, #ffeb3b, #f44336);
              height: 8px;
              border-radius: 4px;
            }
          
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              background:rgb(255, 255, 255);
              border-radius: 50%;
              cursor: pointer; /* Change cursor to pointer for better usability */
            }
            input[type="range"]:focus {
              outline: none;
            }
            `}
        </style>
        <input
          type="number"
          min="1"
          max="5"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))} // Convert to number
          className="ml-4 w-16 text-center border rounded"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <button className="p-2 bg-red-500 text-white rounded" onClick={() => props.onSubmit(false, condition)}>
          Back
        </button>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => props.onSubmit(true, condition)}>
          Next
        </button>
      </div>
    </div>
  );
}