import { useState } from "react";

export default function Steps(props: { onSubmit: (next: boolean, allowSteps: boolean) => void }) {
  const [allowSteps, setAllowSteps] = useState<boolean>(false);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Steps</h2>
      <p className="mb-2 text-sm font-medium">
        Is it okay to have steps in your route?
      </p>
      <div className="mt-4">
        <div className="flex space-x-4">
        <label className="flex items-center">
            <input
              type="radio"
              name="agreement"
              value="false"
              defaultChecked // Preselect "No"
              onChange={() => setAllowSteps(false)} // Update state
              className="mr-2"
            />
            No
          </label>
          <label className="flex items-center">
            <input type="radio" name="agreement" value="yes" className="mr-2"  onChange={() => setAllowSteps(true)}/>
            Yes
          </label>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button className="p-2 bg-red-500 text-white rounded" onClick={() => props.onSubmit(false, allowSteps)}>
          Back
        </button>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => props.onSubmit(true, allowSteps)}>
          Next
        </button>
      </div>
    </div>
  );
}