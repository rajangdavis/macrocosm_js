import * as style from "./knob_styles";
import { useContext } from "react";
import { SliderStateContext } from "../../hooks/slider_state";

module.exports = {
  LittleKnob: (props) => {
    let newProps = {
      ...props,
      dialStyle: style.littleKnobDial,
      knobContainer: style.littleKnobContainer,
      knobFunction: style.littleKnob,
      magicNumber: 149,
    };
    return Knob(newProps);
  },
  BigKnob: (props) => {
    let newProps = {
      ...props,
      dialStyle: style.bigKnobDial,
      knobContainer: style.bigKnobContainer,
      knobFunction: style.bigKnob,
      magicNumber: 146,
    };
    return Knob(newProps);
  },
  InvertedBigKnob: (props) => {
    let newProps = {
      ...props,
      dialStyle: style.invertedBigKnobDial,
      knobContainer: style.bigKnobContainer,
      knobFunction: style.invertedBigKnob,
      magicNumber: 146,
    };
    return Knob(newProps);
  },
};

function Knob(props) {
  let maxValue = props.maxValue != undefined ? props.maxValue : 127;
  let minValue = props.minValue != undefined ? props.minValue : 0;
  const { sliderState } = useContext(SliderStateContext);

  const updateVal = (event) => {
    props.setVal(parseInt(event.target.value));
  };

  const angleCalc = (intValue) => {
    return (298 / maxValue) * intValue - props.magicNumber;
  };

  return (
    <div className={`knob ${props.className}`} style={props.knobContainer}>
      <div style={props.knobFunction(angleCalc(props.val))}>
        <div style={props.dialStyle}></div>
      </div>
      <div style={style.textLabel}>
        <span>{props.label}</span>
      </div>
      <input
        type="range"
        min="0"
        max={maxValue}
        value={props.val}
        style={style.inputRange(sliderState)}
        onChange={updateVal}
        onClickCapture={updateVal}
      />
    </div>
  );
}
