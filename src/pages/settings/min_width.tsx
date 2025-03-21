import { useState } from "react";

export default function MinWidth(props: { onSubmit: (next: boolean, minWidth: number) => void }) {
  const [minWidth, setMinWidth] = useState<number>(2);
  const [sliderValue, setSliderValue] = useState<number>(minWidth);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Minimum Path Width</h2>
      <p className="mb-2 text-sm font-medium">
        Select minimum width of the paths in your route:<br />
        For wheelchair users or people with limited mobility, we recommend a minimum path width of 2m.
      </p>
      <div className="flex items-center">
        <input
          type="range"
          min="1"
          max="5"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))} // Convert to number
            className="w-1/5"
          />
        <span className="ml-2 text-sm">{sliderValue}m</span>
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
        <button className="p-2 bg-red-500 text-white rounded" onClick={() => props.onSubmit(false, minWidth)}>
          Back
        </button>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => props.onSubmit(true, minWidth)}>
          Next
        </button>
      </div>
    </div>
  );
}