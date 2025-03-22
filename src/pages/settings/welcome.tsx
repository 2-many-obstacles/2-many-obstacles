import NavigationButtons from "./navigation_buttons";

export default function Welcome(props : {onSubmit : (advancedMobility: boolean) => void}) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Welcome!</h2>
      <h3 className="text-sm mt-2">Do you want to customize advanced mobility settings?</h3>
        <div className="mt-4 flex justify-between">
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-16 px-4">
        <button className="p-2 bg-red-500 text-white rounded" onClick={() => props.onSubmit(false)}>
          No
        </button>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => props.onSubmit(true)}>
          Yes
        </button>
      </div>
        </div>
    </div>
  );
}