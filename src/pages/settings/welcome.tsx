import NavigationButtons from "./navigation_buttons";

export default function Welcome(props : {onSubmit : (advancedMobility: boolean) => void}) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Welcome!</h2>
      <h3 className="text-sm mt-2">Do you want to costumize advanced mobility settings?</h3>
        <div className="mt-4 flex justify-between">
            <NavigationButtons
                    onBack={() => props.onSubmit(false)}
                    onNext={() => props.onSubmit(true)}
            />
        </div>
    </div>
  );
}