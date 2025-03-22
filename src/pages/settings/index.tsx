/*

Rollstuhlfahrer
- Routenpräferez: empfohlen

Profilparameter:
- Maximale Steigung: default 6 (3/6/10/15)
- Maximale Bordsteinhöhe: 0.06 (0,03/0,06/0,1)
- Minimale Wegbreite: 1 (0-30) m
- Oberflächenbeschaffenheit: Gut (slider mit Farben)
- Min. Oberflächentyp
- Min. Wegzustand
- Features vermin: Stufen/Furten

- Features vermeiden: Stufen/Furten/Fähren default: Stufen + Furten
- Grenzen vermeiden: leer
- Länder vermeiden: leer
- Alternativ Routen: 1

*/
import { useState } from "react";
import Welcome from "./welcome";
import MaxSlope from "./max_slope";
import MaxCurb from "./max_curb";
import MinWidth from "./min_width";
import SurfaceCondition from "./surface_condition";
import SurfaceType from "./surface_type";
import Steps from "./steps";
import Router from "next/router";

interface Question {
  id: number;
  question: JSX.Element | string;
}


export default function Questionnaire() {
  const [step, setStep] = useState<number>(0);

  const questions: Question[] = [
    { id: 1, question: <Welcome onSubmit={(advancedMobility) => 
      {
        if(advancedMobility) {
          setStep(step + 1);}
        else {
          localStorage.setItem("settings", "true");
          Router.push("/");
        }
        }}/> },
    { id: 2, question: <MaxSlope onSubmit={(next, slope) => 
      {
        if(next) {
          setStep(step + 1);
          localStorage.setItem("max_slope", slope.toString());
        }
        else{
          setStep(step - 1);
        }
        }}/> },
    { id: 3, question: <MaxCurb onSubmit={ (next, max_curb) => 
      {
        if(next) {
          setStep(step + 1);
          localStorage.setItem("max_curb", max_curb.toString());}
        else{
          setStep(step - 1);
        }
        }}/> },
    { id: 4, question: <MinWidth onSubmit={(next, min_width) => 
      {
        if(next) {
          setStep(step + 1);
          localStorage.setItem("min_width", min_width.toString());}
        else{
          setStep(step - 1);
        }
        }}/> },
    { id: 5, question: <SurfaceCondition onSubmit={(next, condition) => 
      {
        if(next) {
          setStep(step + 1);
          console.log(condition);
        }
        else{
          setStep(step - 1);
        }
        }}/> },
    { id: 6, question: <SurfaceType onSubmit={(next, surface_type) => 
      {
        if(next) {
          setStep(step + 1);
          localStorage.setItem("surface_type", surface_type.toString());}
        else{
          setStep(step - 1);
        }
        }}/> },
    { id: 7, question: <Steps onSubmit={(next, allowSteps) => 
      {
        if(next) {
          localStorage.setItem("allowSteps", allowSteps.toString());
          localStorage.setItem("settings", "true");
          Router.push("/");
        }
        else{
          setStep(step - 1);
        }
        }}/> },
  ];


  return (
    <div className="p-4 max-w-3xl mx-auto">
      {questions[step].question}
    </div>
  );
}