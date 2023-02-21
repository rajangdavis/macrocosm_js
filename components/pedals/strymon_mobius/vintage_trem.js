import CustomSelect from "../../custom_select";
export default function VintageTrem(props) {
  let { state, dispatch } = props;
  // VINTAGE TREM - Mode 31 0-2
  // VINTAGE TREM - Pan 32 0-1
  let { 31: mode, 32: pan } = state;

  let modeOptions = ["Tube", "Harmonic", "Photoresistor"];

  let padOptions = ["Off", "Half", "Full"];

  const setOptionVal = (options, key) => {
    return (value) => {
      let ccVal = options.findIndex((x) => x == value);
      dispatch({ key: key, value: ccVal });
    };
  };

  const setModeOptions = setOptionVal(modeOptions, 31);
  const setPadOptions = setOptionVal(padOptions, 32);

  return (
    <>
      <div className="flex-row">
        <CustomSelect
          inputLabel="mode"
          options={modeOptions}
          defaultOption={modeOptions[mode]}
          onChange={setModeOptions}
        />
      </div>
      <br />
      <div className="flex-row">
        <CustomSelect
          inputLabel="pan"
          options={padOptions}
          defaultOption={padOptions[pan]}
          onChange={setPadOptions}
        />
      </div>
    </>
  );
}
