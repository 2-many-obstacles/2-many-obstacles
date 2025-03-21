export default function MaxSlope(props: { onSubmit: (curb: string, next: boolean) => void }) {
  const slopeOptions = [
    { value: "3 cm"},
    { value: "6 cm"},
    { value: "10 cm"},
    ];

  const handleChange = (curb: string, next: boolean) => {
    props.onSubmit(curb, next);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Max Curb Height</h2>
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium">Select Maximum Slope in your route:</p>
        {slopeOptions.map((option) => (
          <label key={option.value} className="block mb-2">
            <input
              type="radio"
              name="slope"
              value={option.value}
              onChange={() => handleChange(option.value, true)}
              className="mr-2"
            />
         </label>
        ))}
      </div>
        <div className="mt-4 flex justify-between">
            <button className="p-2 bg-red-500 text-white rounded" onClick={() => props.onSubmit(option.value, false)}>
            Back
            </button>
            <button className="p-2 bg-blue-500 text-white rounded" onClick={() => props.onSubmit("300cm",true)}>
            Next
            </button>
        </div>
    </div>
  );
}