import CustomSelect from "../../custom_select";
export default function Formant(props) {
  let { state, dispatch } = props;
  // FORMANT - Vowel 1 65 0-5
  // FORMANT - Vowel 2 66 0-5
  // FORMANT - LFO 67 0-6
  // FORMANT - Stereo Spread 115 0-4
  let { 65: vowel1, 66: vowel2, 67: waveShape, 115: spread } = state;

  let vowelOptions = ["AA", "EE", "EYE", "OH", "OOH", "Random"];

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

  const setVowel1Options = setOptionVal(vowelOptions, 65);
  const setVowel2Options = setOptionVal(vowelOptions, 66);
  const setWaveShapeOption = setOptionVal(waveShapeOptions, 67);
  const setSpreadOption = setOptionVal(spreadOptions, 115);

  return (
    <>
      <div className="flex-row" style={{ gap: "20px" }}>
        <CustomSelect
          inputLabel="vowel 1"
          options={vowelOptions}
          defaultOption={vowelOptions[vowel1]}
          onChange={setVowel1Options}
        />
        <CustomSelect
          inputLabel="vowel2"
          options={vowelOptions}
          defaultOption={vowelOptions[vowel2]}
          onChange={setVowel2Options}
        />
      </div>
      <br />
      <div className="flex-row" style={{ gap: "20px" }}>
        <CustomSelect
          inputLabel="spread"
          options={spreadOptions}
          defaultOption={spreadOptions[spread]}
          onChange={setSpreadOption}
        />
        <CustomSelect
          inputLabel="wave shape"
          options={waveShapeOptions}
          defaultOption={waveShapeOptions[waveShape]}
          onChange={setWaveShapeOption}
        />
      </div>
    </>
  );
}
