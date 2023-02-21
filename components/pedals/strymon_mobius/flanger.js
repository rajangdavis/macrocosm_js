import { WidePadButton } from "../pad_button";
import { BigKnob } from "../knob";
export default function Flanger(props) {
  let { state, dispatch } = props;
  // FLANGER - Mode 24 0-5
  // FLANGER - Regen 25 0-17
  // FLANGER - Manual 26 0-17
  let { 24: mode, 25: regen, 26: manual } = state;

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  const isSelected = (index) => {
    return mode == index ? "selected" : "not-selected";
  };

  let modeOptions = [
    "Silver",
    "Grey",
    "Black +",
    "Black -",
    "Zero +",
    "Zero -",
  ];

  return (
    <>
      <div className="flex-row" style={{ gap: "20px" }}>
        {modeOptions
          .filter((_, index) => {
            return index < 3;
          })
          .map((option, index) => {
            return (
              <WidePadButton
                key={index}
                label={option}
                className={isSelected(index)}
                onClick={() => setVal(24, index)}
              />
            );
          })}
      </div>
      <div className="flex-row" style={{ gap: "20px" }}>
        {modeOptions
          .filter((_, index) => {
            return index >= 3;
          })
          .map((option) => {
            let trueIndex = modeOptions.findIndex((x) => x == option);
            return (
              <WidePadButton
                key={trueIndex}
                label={option}
                className={isSelected(trueIndex)}
                onClick={() => setVal(24, trueIndex)}
              />
            );
          })}
      </div>
      <br />
      <div className="flex-row">
        <BigKnob
          label="regen"
          maxValue={17}
          setVal={(value) => {
            return setVal(25, value);
          }}
          val={regen}
        />
        <BigKnob
          label="manual"
          maxValue={17}
          setVal={(value) => {
            return setVal(26, value);
          }}
          val={manual}
        />
      </div>
    </>
  );
}
