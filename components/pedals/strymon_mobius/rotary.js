import { WidePadButton } from "../pad_button";
import { BigKnob } from "../knob";
export default function Rotary(props) {
  let { state } = props;
  // ROTARY - Horn Level 34 0-17
  // ROTARY - Preamp Drive 35 0-17
  // ROTARY - Slow Rotor Speed 36 0-17
  // ROTARY - Acceleration 37 0-17
  // ROTARY - Tap Select 39 0-1
  let {
    34: hornLevel,
    35: preampDrive,
    36: slowRotorSpeed,
    37: acceleration,
    39: tapSelect,
  } = state;

  const setVal = (key, value) => {
    props.dispatch({ key: key, value: value });
  };

  const isSelected = (index) => {
    return tapSelect == index ? "selected" : "not-selected";
  };

  let tapSelectOptions = ["Off", "On"];

  return (
    <>
      <div className="flex-row" style={{ gap: "50px" }}>
        <BigKnob
          label="horn level"
          maxValue={17}
          setVal={(value) => {
            return setVal(34, value);
          }}
          val={hornLevel}
        />
        <BigKnob
          label="preamp drive"
          maxValue={17}
          setVal={(value) => {
            return setVal(35, value);
          }}
          val={preampDrive}
        />
        <BigKnob
          label="slow rotor speed"
          maxValue={17}
          setVal={(value) => {
            return setVal(36, value);
          }}
          val={slowRotorSpeed}
        />
        <BigKnob
          label="acceleration"
          maxValue={17}
          setVal={(value) => {
            return setVal(37, value);
          }}
          val={acceleration}
        />
      </div>
      <br />
      <div className="text-center">
        <div className="flex-row" style={{ gap: "20px" }}>
          {tapSelectOptions.map((option, index) => {
            return (
              <WidePadButton
                key={index}
                label={option}
                className={isSelected(index)}
                onClick={() => setVal(39, index)}
              />
            );
          })}
        </div>
        <br />
        <div>Tap Select</div>
      </div>
    </>
  );
}
