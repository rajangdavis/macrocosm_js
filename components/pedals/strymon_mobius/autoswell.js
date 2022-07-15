import CustomSelect from "../../custom_select";
import { BigKnob } from "../knob";

export default function Autoswell(props) {
  let { state } = props;
  // AUTOSWELL - Rise Time 57 0-22
  // AUTOSWELL - Shape 58 0-3
  let { 57: riseTime, 58: shape } = state;

  const setVal = (key, value) => {
    props.dispatch({ key: key, value: value });
  };

  let shapeOptions = ["Exponential", "Quadratic", "Ramp", "Logarithmic"];
  const setOptionVal = (options, key) => {
    return (value) => {
      let ccVal = options.findIndex((x) => x == value);
      dispatch({ key: key, value: ccVal });
    };
  };

  const setShapeOptions = setOptionVal(shapeOptions, 58);

  return (
    <>
      <div className="flex-row">
        <CustomSelect
          inputLabel="shape"
          options={shapeOptions}
          defaultOption={shapeOptions[shape]}
          onChange={setShapeOptions}
        />
      </div>
      <br />
      <div className="flex-row">
        <BigKnob
          label="rise time"
          maxValue={22}
          setVal={(value) => {
            return setVal(57, value);
          }}
          val={riseTime}
        />
      </div>
    </>
  );
}
