import CustomSelect from "../../custom_select";
import { BigKnob } from "../knob";
export default function Filter(props) {
  let { state, dispatch } = props;
  // FILTER - Mode 48 0-2
  // FILTER - Waveshape 49 0-7
  // FILTER - Resonance 50 0-18
  // FILTER - Dry Level 51 0-18
  // FILTER - Frequency Middle 52 0-20
  // FILTER - Stereo Spread 69 0-4
  let {
    48: mode,
    49: waveShape,
    50: resonance,
    51: dryLevel,
    52: frequencyMiddle,
    69: spread,
  } = state;

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  let modeOptions = ["Low Pass", "Wah", "High Pass"];

  let waveShapeOptions = [
    "Sine",
    "Triangle",
    "Square",
    "Ramp",
    "Saw",
    "Random",
    "Envelope +",
    "Envelope -",
  ];

  let spreadOptions = ["Off", "1/4", "Half", "3/4", "Full"];

  const setOptionVal = (options, key) => {
    return (value) => {
      let ccVal = options.findIndex((x) => x == value);
      dispatch({ key: key, value: ccVal });
    };
  };

  const setModeOption = setOptionVal(modeOptions, 48);
  const setWaveShapeOption = setOptionVal(waveShapeOptions, 49);
  const setSpreadOption = setOptionVal(spreadOptions, 69);

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
        <CustomSelect
          inputLabel="spread"
          options={spreadOptions}
          defaultOption={spreadOptions[spread]}
          onChange={setSpreadOption}
        />
        <BigKnob
          label="Resonance"
          maxValue={18}
          setVal={(value) => {
            return setVal(50, value);
          }}
          val={resonance}
        />
        <BigKnob
          label="Dry Level"
          maxValue={18}
          setVal={(value) => {
            return setVal(51, value);
          }}
          val={dryLevel}
        />
        <BigKnob
          label="Frequency Middle"
          maxValue={20}
          setVal={(value) => {
            return setVal(52, value);
          }}
          val={frequencyMiddle}
        />
      </div>
      <br />
    </>
  );
}
