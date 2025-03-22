import { useState } from "react";

export default function Steps(props: { onSubmit: (next: boolean, allowSteps: boolean) => void }) {
  const [allowSteps, setAllowSteps] = useState<boolean>(false);

  const allowStepsOptions = [
    { value: true, description: "I want to have steps in my route." },
    { value: false, description: "I don't want to have steps in my route." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl font-black block pt-10 px-6">Steps</h2>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="mb-2 text-lg font-medium px-6">
          Is it okay to have steps in your route?</p>
        <div className="mt-auto">
          {allowStepsOptions.map((option) => (
            <>
              <input
                type="radio"
                name="slope"
                id={option.value.toString()}
                value={option.value.toString()}
                checked={allowSteps === option.value}
                onChange={() => setAllowSteps(option.value)}
                className="hidden"
              />
              <label key={option.value.toString()} htmlFor={option.value.toString()} className="block w-full py-4 text-black text-center min-h-26 flex flex-col items-center justify-center" style={{ backgroundColor: allowSteps !== option.value ? 'var(--color-300)' : 'var(--color-500)', borderTop: '1px solid #9E9E9E' }}>
                <p className="text-lg font-bold">{option.value ? 'yes' : 'no'}</p>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: option.description }} />
              </label>
            </>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <button className="w-full py-4 text-white" style={{ backgroundColor: 'var(--color-700)' }} onClick={() => props.onSubmit(true, allowSteps)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
