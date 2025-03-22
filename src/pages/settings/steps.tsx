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
      <div>
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-16 px-4">
          <div className="mt-4 flex justify-between">
              <button className="p-2 bg-green-500 text-white rounded" onClick={() => props.onSubmit(true, allowSteps)}>
              Start Planning Your Route!
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}