import { WidePadButton } from "../pad_button";
import { BigKnob } from "../knob";
export default function Chorus(props) {
  let { state } = props;
  let { 28: mode, 29: mix, 30: tone } = state;

  const setVal = (key, value) => {
    props.dispatch({ key: key, value: value });
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
