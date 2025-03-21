import { useState } from "react";
import NavigationButtons from "./navigation_buttons";

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
       <NavigationButtons
               onBack={() => props.onSubmit(false, allowSteps)}
               onNext={() => props.onSubmit(true, allowSteps)}
             />
      </div>
    </div>
  );
}