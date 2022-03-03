import { LittleKnob } from "../knob";

export default function SecondRow(props) {
  let {
    25: lateModulation,
    19: multiply,
    20: dimension,
    21: dynamics,
    27: dynamicFlangerSpeed,
  } = props.polymoonState;

  let setLateModulation = (value) => {
    props.polymoonDispatch({ key: 25, value: value });
  };
  let setMultiply = (value) => {
    props.polymoonDispatch({ key: 19, value: value });
  };
  let setDimension = (value) => {
    props.polymoonDispatch({ key: 20, value: value });
  };
  let setDynamics = (value) => {
    props.polymoonDispatch({ key: 21, value: value });
  };
  let setDynamicFlangerSpeed = (value) => {
    props.polymoonDispatch({ key: 27, value: value });
  };

  return (
    <div className="flex-row">
      <LittleKnob
        className="middle-row late-modulation"
        label="Late Modulation"
        setVal={setLateModulation}
        val={lateModulation}
      />
      <LittleKnob
        className="middle-row multiply"
        label="Multiply"
        setVal={setMultiply}
        val={multiply}
      />
      <LittleKnob
        className="middle-row dimension"
        label="Dimension"
        setVal={setDimension}
        val={dimension}
      />
      <LittleKnob
        className="middle-row dynamics"
        label="dynamics"
        setVal={setDynamics}
        val={dynamics}
      />
      <LittleKnob
        className="middle-row dynamic-flanger-speed"
        label="Dynamic Flanger Speed"
        setVal={setDynamicFlangerSpeed}
        val={dynamicFlangerSpeed}
      />
    </div>
  );
}
