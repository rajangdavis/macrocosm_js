import CustomSelect from "../../custom_select";
import { BigKnob } from "../knob";
export default function Phaser(props) {
  let { state, dispatch } = props;
  // PHASER - Mode 44 0-6
  // PHASER - Regen 45 0-17
  // PHASER - Waveshape 46 0-3
  // PHASER - Stereo Spread 47 0-4
  // PHASER - Headroom 68 0-17
  let { 44: mode, 45: regen, 46: waveShape, 47: spread, 68: headroom } = state;

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  let modeOptions = [
    "2 Stage",
    "4 Stage",
    "6 Stage",
    "8 Stage",
    "12 Stage",
    "16 Stage",
    "Barber Pole",
  ];

  let waveShapeOptions = ["Sine", "Square", "Ramp", "Tri", "Saw"];

  let spreadOptions = ["Off", "1/4", "Half", "3/4", "Full"];

  const setOptionVal = (options, key) => {
    return (value) => {
      let ccVal = options.findIndex((x) => x == value);
      dispatch({ key: key, value: ccVal });
    };
  };

  const setModeOption = setOptionVal(modeOptions, 44);
  const setWaveShapeOption = setOptionVal(waveShapeOptions, 46);
  const setSpreadOption = setOptionVal(spreadOptions, 47);

  return (
    <>
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
      <div className="flex-row" style={{ gap: "20px" }}>
        <BigKnob
          label="Regen"
          maxValue={17}
          setVal={(value) => {
            return setVal(45, value);
          }}
          val={regen}
        />
        <CustomSelect
          inputLabel="spread"
          options={spreadOptions}
          defaultOption={spreadOptions[spread]}
          onChange={setSpreadOption}
        />
        <BigKnob
          label="Headroom"
          maxValue={17}
          setVal={(value) => {
            return setVal(68, value);
          }}
          val={headroom}
        />
      </div>
      <br />
    </>
  );
}
