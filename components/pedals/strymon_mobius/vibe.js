import { WidePadButton } from "../pad_button";
import { BigKnob } from "../knob";
export default function Vibe(props) {
  let { state } = props;
  // VIBE - Waveshape 40 0-17
  // VIBE - Low End 41 0-20
  // VIBE - Headroom 42 0-17
  // VIBE - Mode 43 0-1
  let { 40: waveshape, 41: low, 42: headroom, 43: mode } = state;

  const setVal = (key, value) => {
    props.dispatch({ key: key, value: value });
  };

  const isSelected = (index) => {
    return mode == index ? "selected" : "not-selected";
  };

  let modeOptions = ["Vibrato", "Chorus"];

  return (
    <div>
      <div className="flex-row">
        <BigKnob
          label="Waveshape"
          maxValue={17}
          setVal={(value) => {
            return setVal(40, value);
          }}
          val={waveshape}
        />
        <BigKnob
          label="Low End"
          maxValue={20}
          setVal={(value) => {
            return setVal(41, value);
          }}
          val={low}
        />
        <BigKnob
          label="Headroom"
          maxValue={17}
          setVal={(value) => {
            return setVal(42, value);
          }}
          val={headroom}
        />
      </div>
      <br />
      <div className="text-center">
        <div className="flex-row" style={{ gap: "20px" }}>
          {modeOptions.map((option, index) => {
            return (
              <WidePadButton
                key={index}
                label={option}
                className={isSelected(index)}
                onClick={() => setVal(43, index)}
              />
            );
          })}
        </div>
        <br />
        <div>Mode</div>
      </div>
    </div>
  );
}
