export default function NavigationButtons(props: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <button className="w-full py-4 text-white" style={{ backgroundColor: 'var(--color-700)' }} onClick={props.onNext}>
        Next
      </button>
    </div>
  );
}
