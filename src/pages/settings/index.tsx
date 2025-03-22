import MaxCurb from "./max_curb";
import MaxSlope from "./max_slope";
import MinWidth from "./min_width";
import Router from "next/router";
import Steps from "./steps";
import SurfaceCondition from "./surface_condition";
import SurfaceType from "./surface_type";
import Welcome from "./welcome";
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

interface Question {
  id: number;
  question: JSX.Element | string;
}


export default function Questionnaire() {
  const [step, setStep] = useState<number>(0);

  const questions: Question[] = [
    {
      id: 1, question: <Welcome onSubmit={(advancedMobility) => {
        if (advancedMobility) {
          setStep(step + 1);
        }
        else {
          localStorage.setItem("settings", "true");
          Router.push("/");
        }
      }} />
    },
    {
      id: 2, question: <MaxSlope onSubmit={(next, slope) => {
        if (next) {
          setStep(step + 1);
          localStorage.setItem("max_slope", slope.toString());
        }
        else {
          setStep(step - 1);
        }
      }} />
    },
    {
      id: 3, question: <MaxCurb onSubmit={(next, max_curb) => {
        if (next) {
          setStep(step + 1);
          localStorage.setItem("max_curb", max_curb.toString());
        }
        else {
          setStep(step - 1);
        }
      }} />
    },
    {
      id: 4, question: <MinWidth onSubmit={(next, min_width) => {
        if (next) {
          setStep(step + 1);
          localStorage.setItem("min_width", min_width.toString());
        }
        else {
          setStep(step - 1);
        }
      }} />
    },
    {
      id: 5, question: <SurfaceCondition onSubmit={(next, condition) => {
        if (next) {
          setStep(step + 1);
          console.log(condition);
          localStorage.setItem("surface_condition", condition);
        }
        else {
          setStep(step - 1);
        }
      }} />
    },
    {
      id: 6, question: <SurfaceType onSubmit={(next, surface_type) => {
        if (next) {
          setStep(step + 1);
          localStorage.setItem("surface_type", surface_type.toString());
        }
        else {
          setStep(step - 1);
        }
      }} />
    },
    {
      id: 7, question: <Steps onSubmit={(next, allowSteps) => {
        if (next) {
          localStorage.setItem("allowSteps", allowSteps.toString());
          localStorage.setItem("settings", "true");
          Router.push("/");
        }
        else {
          setStep(step - 1);
        }
      }} />
    },
  ];


  return (
    <>
      <style jsx>{`
        * {
          --color-300: #E6E0DB;
          --color-500: #E2CBB4;
          --color-700: #DB7D4B;
          --color-900: #594B3D;

          color: white;
          font-family: "Inter", sans-serif !important;
        }

        .bg {
          background-size: 100% 100%;
          background-position: 0px 0px,0px 0px;
          background-color: var(--color-900);
          background-image: linear-gradient(270deg, rgba(var(--color-900), 0.2) 0%, rgba(var(--color-700), 0.2) 100%), radial-gradient(75% 75% at 50% 50%, rgba(var(--color-500), 0.2) 0%, rgba(#000, 0.2) 100%);
        }
      `}</style>
      <div className="bg w-full h-screen">
        {questions[step].question}
      </div>
    </>
  );
}
