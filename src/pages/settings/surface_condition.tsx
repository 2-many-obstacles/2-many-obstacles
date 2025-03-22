import NavigationButtons from "./navigation_buttons";
import { useState } from "react";

export default function SurfaceCondition(props: { onSubmit: (next: boolean, condition: string) => void }) {
  const [condition, setCondition] = useState<string>("intermediate");
  const [sliderValue, setSliderValue] = useState<number>(6);

  type Label = {
    title: string;
    description: string;
    value: string;
  }

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setCondition(labels[8 - value].value);
  };

  const labels: Label[] = [{
    title: "Excellent",
    description: "smooth asphalt or concrete",
    value: "excellent"
  }, {
    title: "Good",
    description: "asphalt with small cracks",
    value: "good"
  }
    , {
    title: "Intermediate",
    description: "asphalt with large cracks",
    value: "intermediate"
  }
    , {
    title: "Bad",
    description: "strongly damaged",
    value: "bad"
  }
    , {
    title: "Very Bad",
    description: "unpaved roads with potholes ad rots",
    value: "very_bad"
  }
    , {
    title: "Horrible",
    description: "even worse",
    value: "horrible"
  }
    , {
    title: "Very Horrible",
    description: "obstacles on the way",
    value: "very_horrible"
  }
    , {
    title: "Impassable",
    description: "big obstacles on the way",
    value: "impassable"
  }

  ];

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl font-black block pt-10 px-6">Surface Condition</h2>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="mb-2 text-lg font-medium px-6">
          Choose minimum surface condition:<br />
          All surfaces on the route will be at least in this condition. <br />
          For wheelchair users or people with limited mobility, we recommend a minimum surface condition of good or Intermediate.
        </p>
        <div className="flex items-center mt-12" style={{ transform: 'translateX(-280px)' }}>
          <style>
            {`
            input[type="range"] {
              transform-origin: 255px 105px;
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
              className="w-110 h-90 -rotate-90 "
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
        <div style={{ marginTop: 'auto' }}>
          <NavigationButtons
            onBack={() => props.onSubmit(false, condition)}
            onNext={() => props.onSubmit(true, condition)}
          />
        </div>
      </div>
    </div>

  );
}
