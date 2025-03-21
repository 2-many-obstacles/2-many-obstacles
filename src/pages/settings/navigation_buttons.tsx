export default function NavigationButtons(props: { onBack: () => void; onNext: () => void }) {
    return (
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-16 px-4">
        <button className="p-2 bg-red-500 text-white rounded" onClick={props.onBack}>
          Back
        </button>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={props.onNext}>
          Next
        </button>
      </div>
    );
  }