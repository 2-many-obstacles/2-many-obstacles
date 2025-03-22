import NavigationButtons from "./navigation_buttons";
import { useState } from "react";

export default function MinWidth(props: { onSubmit: (next: boolean, minWidth: number) => void }) {
  const [minWidth, setMinWidth] = useState<number>(2);

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl font-black block pt-10 px-6">Minimum Footwalk Width</h2>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="mb-2 text-lg font-medium px-6">
          Select minimum width of the paths in your route.<br /><br />
          For wheelchair users or people with limited mobility, we recommend a minimum path width of 2m.
        </p>
        <div className="flex flex-col items-center mx-xl max-w-full">
          <input
            type="range"
            min="1"
            max="5"
            value={minWidth}
            onChange={(e) => setMinWidth(Number(e.target.value))} // Convert to number
            className="w-1/5"
          />
          <span className="ml-2 text-4xl"><b>{minWidth}</b> m</span>

          <style>
            {`
              input[type="range"] {
                -webkit-appearance: none;
                width: calc(100% - 56px);
                height: 16px;
                background-color: #ddd;
                border-radius: 8px;
                outline: none;
                margin-left: 24px;
                margin-right: 24px;
                box-sizing: border-box;
                margin-top: 60px;
                margin-bottom: 20px;
              }
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 32px;
                height: 32px;
                background-color: var(--color-700);
                border-radius: 50%;
                cursor: pointer;
              }
            `}
          </style>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <NavigationButtons
            onBack={() => props.onSubmit(false, minWidth)}
            onNext={() => props.onSubmit(true, minWidth)}
          />
        </div>
      </div>
    </div>
  );
}
