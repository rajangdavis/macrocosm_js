import CustomSelect from "../../custom_select";
import { WidePadButton } from "../pad_button";
import { LittleKnob } from "../knob";
export default function Chorus(props) {
  let { state, dispatch } = props;
  // PATTERN TREM - Waveshape 113 0-6
  // PATTERN TREM - Beat 1 105 0-17
  // PATTERN TREM - Beat 2 106 0-18
  // PATTERN TREM - Beat 3 107 0-18
  // PATTERN TREM - Beat 4 108 0-18
  // PATTERN TREM - Beat 5 109 0-18
  // PATTERN TREM - Beat 6 110 0-18
  // PATTERN TREM - Beat 7 111 0-18
  // PATTERN TREM - Beat 8 112 0-18
  // PATTERN TREM - Pan 114 0-1
  let {
    113: waveShape,
    105: beat1,
    106: beat2,
    107: beat3,
    108: beat4,
    109: beat5,
    110: beat6,
    111: beat7,
    112: beat8,
    114: pan,
  } = state;

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  let panOptions = ["Off", "On"];

  const isSelected = (index) => {
    return pan == index ? "selected" : "not-selected";
  };

  let waveShapeOptions = [
    "Sine",
    "Triangle",
    "Square",
    "Rectangle",
    "Pulse",
    "Ramp",
    "Saw",
  ];
  const setOptionVal = (options, key) => {
    return (value) => {
      let ccVal = options.findIndex((x) => x == value);
      dispatch({ key: key, value: ccVal });
    };
  };

  const setWaveShapeOption = setOptionVal(waveShapeOptions, 113);

  return (
    <>
      <div className="flex-row">
        <LittleKnob
          label="beat 1"
          maxValue={17}
          setVal={(value) => {
            return setVal(105, value);
          }}
          val={beat1}
        />
        <LittleKnob
          label="beat 2"
          maxValue={18}
          setVal={(value) => {
            return setVal(106, value);
          }}
          val={beat2}
        />
        <CustomSelect
          inputLabel="wave shape"
          options={waveShapeOptions}
          defaultOption={waveShapeOptions[waveShape]}
          onChange={setWaveShapeOption}
        />
        <LittleKnob
          label="beat 3"
          maxValue={18}
          setVal={(value) => {
            return setVal(107, value);
          }}
          val={beat3}
        />
        <LittleKnob
          label="beat 4"
          maxValue={18}
          setVal={(value) => {
            return setVal(108, value);
          }}
          val={beat4}
        />
      </div>
      <br />
      <div className="flex-row">
        <LittleKnob
          label="beat 5"
          maxValue={18}
          setVal={(value) => {
            return setVal(109, value);
          }}
          val={beat5}
        />
        <LittleKnob
          label="beat 6"
          maxValue={18}
          setVal={(value) => {
            return setVal(110, value);
          }}
          val={beat6}
        />
        <div className="text-center">
          <div className="flex-row" style={{ gap: "20px" }}>
            {panOptions.map((option, index) => {
              return (
                <WidePadButton
                  key={index}
                  label={option}
                  className={isSelected(index)}
                  onClick={() => setVal(114, index)}
                />
              );
            })}
          </div>
          <br />
          <div>Pan</div>
        </div>
        <LittleKnob
          label="beat 7"
          maxValue={18}
          setVal={(value) => {
            return setVal(111, value);
          }}
          val={beat7}
        />
        <LittleKnob
          label="beat 8"
          maxValue={18}
          setVal={(value) => {
            return setVal(112, value);
          }}
          val={beat8}
        />
      </div>
    </>
  );
}
