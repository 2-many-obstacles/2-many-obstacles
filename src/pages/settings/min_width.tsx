import { useState } from "react";
import NavigationButtons from "./navigation_buttons";

export default function MinWidth(props: { onSubmit: (next: boolean, minWidth: number) => void }) {
  const [minWidth, setMinWidth] = useState<number>(2);

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
          value={minWidth}
          onChange={(e) => setMinWidth(Number(e.target.value))} // Convert to number
            className="w-1/5"
          />
        <span className="ml-2 text-sm">{minWidth}m</span>
        <input
          type="number"
          min="1"
          max="5"
          value={minWidth}
          onChange={(e) => setMinWidth(Number(e.target.value))} // Convert to number
          className="ml-4 w-16 text-center border rounded"
        />
      </div>
      <div>
      <NavigationButtons
        onBack={() => props.onSubmit(false, minWidth)}
        onNext={() => props.onSubmit(true, minWidth)}
      />
      </div>
    </div>
  );
}