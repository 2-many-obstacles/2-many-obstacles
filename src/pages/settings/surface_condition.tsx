import { useState } from "react";

export default function SurfaceCondition(props: { onSubmit: (next: boolean, condition: number) => void }) {
  const [condition, setCondition] = useState<number>(7);
  const [sliderValue, setSliderValue] = useState<number>(condition);

  type Label = {
    title: string;
    description: string; 
  }

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setCondition(value);
  };

  const labels: Label[] = [{
    title: "Excellent",
    description: "smooth asphalt or concrete"
  }, {
    title: "Good",
    description: "asphalt with small cracks"
  }
  , {
    title: "Intermediate",
    description: "asphalt with large cracks"
  }
  , {
    title: "Bad",
    description: "strongly damaged"
  }
  , {
    title: "Very Bad",
    description: "unpaved roads with potholes ad rots"
  }
  , {
    title: "Horrible",
    description: "even worse"
  }
  , {
    title: "Very Horrible",
    description: "obstacles on the way"
  }
  , {
    title: "Inpassable",
    description: "big obstacles on the way"
  }

  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Surface Condition</h2>
      <p className="mb-2 text-sm font-medium">
        Chose minimum surface condition:<br />
        All surfaces on the route will be at least in this condition. <br />
        For wheelchair users or people with limited mobility, we recommend a minimum surface condition of good or Intermediate.
      </p>
      <div className="flex items-center mt-6">
        
        
        <style>
          {`
            input[type="range"] {
              transform-origin: 250px 110px;
            }
            input[type="range"]::-webkit-slider-runnable-track {
              background: linear-gradient(to left, #4caf50, #ffeb3b, #f44336);
              height: 8px;
              border-radius: 4px;
              width: 100px;
            }
          
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              background:rgb(255, 255, 255);
              border-radius: 50%;
              cursor: default; /* Change cursor to pointer for better usability */
              position: relative;
            }
            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background: rgb(255, 255, 255);
              border-radius: 50%;
              cursor: pointer;
            }

            input[type="range"]:focus {
              outline: none;
            }
          `}  
        </style>

    
      <div className="flex items-stretch">
      <input
          type="range"
          min="1"
          max="8"
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number(e.target.value))} // Convert to number
            className="w-90 h-90 -rotate-90 "
          />
        <div className="flex flex-col justify-between">
          {labels.map((label, index) => (
            <div key={index} className="text-xs text-gray-200">
              <div className="text-sm font-bold">{label.title}</div>
              <div className="text-xs">{label.description} </div>
            </div>
          ))}

        </div>

      </div>
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