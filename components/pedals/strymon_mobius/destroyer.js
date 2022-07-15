import { WidePadButton } from "../pad_button";
import { BigKnob } from "../knob";
export default function Chorus(props) {
  let { state, dispatch } = props;
  // DESTROYER - Bit Depth 59 0-20
  // DESTROYER - Sample Rate 61 0-20
  // DESTROYER - Filter 62 0-8
  // DESTROYER - Vinyl 63 0-18
  // DESTROYER - Mix 64 0-20
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
