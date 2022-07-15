import Bypass from "../bypass";
import { BigKnob } from "../knob";
import DynamicBody from "./dynamic_body";
import CustomSelect from "../../custom_select";

export default function StrymonMobiusLayout(props) {
  let { state, dispatch } = props;

  let {
    102: bypass,
    19: encoderType,
    18: depth,
    15: level,
    9: param1,
    16: param2,
  } = state;

  const options = [
    "Chorus",
    "Flanger",
    "Rotary",
    "Vibe",
    "Phaser",
    "Filter",
    "Formant",
    "Vintage Trem",
    "Pattern Trem",
    "AutoSwell",
    "Destroyer",
    "Quadrature",
  ];

  const setVal = (key, value) => {
    props.dispatch({ key: key, value: value });
  };

  const setTypeEncoder = (value) => {
    let ccVal = options.findIndex((x) => x == value);
    props.dispatch({ key: 19, value: ccVal });
  };

  return (
    <>
      <div className="meris-pedal strymon-mobius-bigbox">
        <div className="right-side-controls">
          <CustomSelect
            inputLabel="Type Encoder"
            options={options}
            defaultOption={options[encoderType]}
            onChange={setTypeEncoder}
          />
          <div className="flex-row" style={{ zIndex: 2 }}>
            <BigKnob
              className="depth"
              label="Depth"
              setVal={(value) => {
                return setVal(18, value);
              }}
              val={depth}
            />
            <BigKnob
              className="level"
              label="Level"
              setVal={(value) => {
                return setVal(15, value);
              }}
              val={level}
            />
            <BigKnob
              className="param1"
              label="Param 1"
              setVal={(value) => {
                return setVal(9, value);
              }}
              val={param1}
            />
            <BigKnob
              className="param2"
              label="Param 2"
              setVal={(value) => {
                return setVal(16, value);
              }}
              val={param2}
            />
          </div>
          <br />
          <div style={{ zIndex: 2 }}>
            <DynamicBody encoderType={encoderType} {...props} />
          </div>
          <Bypass keyVal={102} bypass={bypass} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
}
