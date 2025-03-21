
export default function Thanks(props : {onSubmit : (next: boolean) => void}) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Thank you!</h2>
        <div className="mt-4 flex justify-between">
            <button className="p-2 bg-green-500 text-white rounded" onClick={() => props.onSubmit(true)}>
            Start Planning Your Route!
            </button>
        </div>
    </div>
  );
}