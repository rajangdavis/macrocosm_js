import CustomSelect from "../../custom_select";
import { BigKnob } from "../knob";
export default function Chorus(props) {
  let { state, dispatch } = props;
  // DESTROYER - Bit Depth 59 0-20
  // DESTROYER - Sample Rate 61 0-20
  // DESTROYER - Filter 62 0-8
  // DESTROYER - Vinyl 63 0-18
  // DESTROYER - Mix 64 0-20
  let { 59: bitDepth, 61: sampleRate, 62: filter, 63: vinyl, 64: mix } = state;

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  let filterOptions = [
    "OFF",
    "Portable Vintage Amp",
    "Victrola Phonograph",
    "70s Clock Radio",
    "Bullhorn Megaphone",
    "Cheerleader’s Plastic Megaphone",
    "Antique Telephone Ear Piece",
    "Cell Phone",
    "Apartment Intercom",
  ];

  const setOptionVal = (options, key) => {
    return (value) => {
      let ccVal = options.findIndex((x) => x == value);
      dispatch({ key: key, value: ccVal });
    };
  };

  const setFilterOption = setOptionVal(filterOptions, 62);

  return (
    <>
      <div className="flex-row">
        <CustomSelect
          inputLabel="filter"
          options={filterOptions}
          defaultOption={filterOptions[filter]}
          onChange={setFilterOption}
        />
      </div>
      <br />
      <div className="flex-row">
        <BigKnob
          label="bit Depth"
          maxValue={20}
          setVal={(value) => {
            return setVal(59, value);
          }}
          val={bitDepth}
        />
        <BigKnob
          label="vinyl"
          maxValue={20}
          setVal={(value) => {
            return setVal(63, value);
          }}
          val={vinyl}
        />
        <BigKnob
          label="sample Rate"
          maxValue={20}
          setVal={(value) => {
            return setVal(61, value);
          }}
          val={sampleRate}
        />
        <BigKnob
          label="mix"
          maxValue={20}
          setVal={(value) => {
            return setVal(64, value);
          }}
          val={mix}
        />
      </div>
    </>
  );
}
