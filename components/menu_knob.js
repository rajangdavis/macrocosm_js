import { useState } from "react";
import { LittleKnob, BigKnob } from "./pedals/knob";
export default function MenuKnob(props) {
  const [bigKnobVal, setBigKnobVal] = useState(0);
  const [littleKnobVal, setLitteKnobVal] = useState(0);
  return (
    <div className="menu-knob-container">
      <LittleKnob
        className="menu-knob"
        label="Slider control for little knobs"
        setVal={setLitteKnobVal}
        val={littleKnobVal}
        sliderData={props.sliderData}
      />
      <br />
      <br />
      <br />
      <br />
      <BigKnob
        className="menu-knob"
        label="Slider control for big knobs"
        setVal={setBigKnobVal}
        val={bigKnobVal}
        sliderData={props.sliderData}
      />
    </div>
  );
}
