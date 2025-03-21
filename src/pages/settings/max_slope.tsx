export default function MaxSlope(props: { onSubmit: (selectedSlope: number) => void }) {
  const slopeOptions = [
    { value: 3, description: "Almost no slope. Suitable for everyone." },
    { value: 6, description: "Suitable for wheelchair users." },
    { value: 10, description: "Suitable for most electric wheelchairs." },
    { value: 15, description: "Challenging for most wheelchairs. Only recommended with help of a supporter." },
  ];

  const handleChange = (slope: number) => {
    props.onSubmit(slope);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">MaxSlope</h2>
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium">Select Maximum Slope in your route:</p>
        {slopeOptions.map((option) => (
          <label key={option.value} className="block mb-2">
            <input
              type="radio"
              name="slope"
              value={option.value}
              onChange={() => handleChange(option.value)}
              className="mr-2"
            />
            {option.value}% - <span className="text-gray-600 text-sm">{option.description}</span>
          </label>
        ))}
      </div>
    </div>
  );
}