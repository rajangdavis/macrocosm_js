import CustomSelect from "../../custom_select";
import { BigKnob } from "../knob";
export default function Quadrature(props) {
  let { state, dispatch } = props;
  // QUADRATURE - Mode 53 0-3
  // QUADRATURE - Shift 1 54 0-17
  // QUADRATURE - LFO 56 0-6
  // QUADRATURE - Mix 55 0-20
  let { 53: mode, 54: shift, 56: waveShape, 55: mix } = state;

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  let modeOptions = ["AM", "FM", "Frequency Shifter +", "Frequency Shifter -"];

  let waveShapeOptions = [
    "Sine",
    "Triangle",
    "Square",
    "Ramp",
    "Saw",
    "Random",
    "Envelope",
  ];

  const setOptionVal = (options, key) => {
    return (value) => {
      let ccVal = options.findIndex((x) => x == value);
      dispatch({ key: key, value: ccVal });
    };
  };

  const setModeOption = setOptionVal(modeOptions, 53);
  const setWaveShapeOption = setOptionVal(waveShapeOptions, 56);

  return (
    <div>
      <div className="flex-row" style={{ gap: "20px" }}>
        <CustomSelect
          inputLabel="mode"
          options={modeOptions}
          defaultOption={modeOptions[mode]}
          onChange={setModeOption}
        />
        <CustomSelect
          inputLabel="wave shape"
          options={waveShapeOptions}
          defaultOption={waveShapeOptions[waveShape]}
          onChange={setWaveShapeOption}
        />
      </div>
      <br />
      <div className="flex-row">
        <BigKnob
          label="shift"
          maxValue={17}
          setVal={(value) => {
            return setVal(54, value);
          }}
          val={shift}
        />
        <BigKnob
          label="mix"
          maxValue={20}
          setVal={(value) => {
            return setVal(55, value);
          }}
          val={mix}
        />
      </div>
    </div>
  );
}
