import { LittleKnob, BigKnob } from "../knob";
export default function FirstRow(props) {
  let {
    22: preDelay,
    16: spaceDecay,
    17: modulate,
    18: mix,
    24: pitchVectorMix,
  } = props.mercury7State;

  let setPreDelay = (value) => {
    props.mercury7Dispatch({ key: 22, value: value });
  };
  let setSpaceDecay = (value) => {
    props.mercury7Dispatch({ key: 16, value: value });
  };
  let setModulate = (value) => {
    props.mercury7Dispatch({ key: 17, value: value });
  };
  let setMix = (value) => {
    props.mercury7Dispatch({ key: 18, value: value });
  };
  let setPitchVectorMix = (value) => {
    props.mercury7Dispatch({ key: 24, value: value });
  };

  return (
    <div className="flex-row">
      <BigKnob
        className="top-row pre-delay"
        label="Predelay"
        setVal={setPreDelay}
        val={preDelay}
      />
      <BigKnob
        className="top-row space-decay"
        label="Space Decay"
        setVal={setSpaceDecay}
        val={spaceDecay}
      />
      <LittleKnob
        className="top-row modulate"
        label="Modulate"
        setVal={setModulate}
        val={modulate}
      />
      <BigKnob className="top-row mix" label="Mix" setVal={setMix} val={mix} />
      <BigKnob
        className="top-row pitch-vector-mix"
        label="Pitch Vector Mix"
        setVal={setPitchVectorMix}
        val={pitchVectorMix}
      />
    </div>
  );
}
