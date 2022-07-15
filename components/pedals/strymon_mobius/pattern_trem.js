import { WidePadButton } from "../pad_button";
import { BigKnob } from "../knob";
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
  let { 28: mode, 29: mix, 30: tone } = state;

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  const isSelected = (index) => {
    return mode == index ? "selected" : "not-selected";
  };

  let modeOptions = ["dBucket", "Multi", "Vibratro", "Detune", "Digital"];

  return (
    <div>
      <div className="flex-row" style={{ gap: "20px" }}>
        {modeOptions.map((option, index) => {
          return (
            <WidePadButton
              key={index}
              label={option}
              className={isSelected(index)}
              onClick={() => setVal(28, index)}
            />
          );
        })}
      </div>
      <br />
      <div className="flex-row">
        <BigKnob
          label="mix"
          maxValue={17}
          setVal={(value) => {
            return setVal(29, value);
          }}
          val={mix}
        />
        <BigKnob
          label="tone"
          maxValue={20}
          setVal={(value) => {
            return setVal(30, value);
          }}
          val={tone}
        />
      </div>
    </div>
  );
}
