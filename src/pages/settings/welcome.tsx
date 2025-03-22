import { useState } from "react";

export default function Welcome(props: { onSubmit: (advancedMobility: boolean) => void }) {
  const [customizeMobility] = useState<boolean>(true);

  const customizeMobilityOptions = [
    { value: false, description: "No" },
    { value: true, description: "Yes" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <img src="/squirrel.png" className="pt-16 w-full h-64 object-contain" />
      <h2 className="text-4xl text-center font-black block pt-4 px-6">Welcome</h2>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="mt-auto mb-8 text-lg text-center font-medium px-6">
          Do you want to customize your <br /><b>advanced mobility settings?</b></p>
        <div>
          {customizeMobilityOptions.map((option) => (
            <>
              <input
                type="submit"
                name="slope"
                id={option.value.toString()}
                value={option.value.toString()}
                checked={customizeMobility === option.value}
                onClick={props.onSubmit.bind(null, option.value) as () => void}
                className="hidden"
              />
              <label key={option.value.toString()} htmlFor={option.value.toString()} className="block w-full py-4 text-black text-center min-h-26 flex flex-col items-center justify-center" style={{ backgroundColor: customizeMobility !== option.value ? 'var(--color-300)' : 'var(--color-700)', color: customizeMobility !== option.value ? 'black' : 'white', borderTop: '1px solid #9E9E9E' }}>
                <p className="text-lg font-bold">{option.description}</p>
              </label>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
