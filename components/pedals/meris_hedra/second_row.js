import { LittleKnob } from "../knob";

export default function SecondRow(props) {
  let {
    19: pitch1,
    20: pitch2,
    21: pitch3,
    23: pitchCorrectionAndGlide,
  } = props.hedraState;

  let setPitch1 = (value) => {
    props.hedraDispatch({ key: 19, value: value });
  };
  let setPitch2 = (value) => {
    props.hedraDispatch({ key: 20, value: value });
  };
  let setPitch3 = (value) => {
    props.hedraDispatch({ key: 21, value: value });
  };
  let setPitchCorrectionAndGlide = (value) => {
    props.hedraDispatch({ key: 23, value: value });
  };

  return (
    <div className="flex-row second-row">
      <LittleKnob
        className="middle-row pitch1"
        label="Pitch 1"
        setVal={setPitch1}
        val={pitch1}
      />
      <LittleKnob
        className="middle-row pitch2"
        label="Pitch 2"
        setVal={setPitch2}
        val={pitch2}
      />
      <LittleKnob
        className="middle-row pitch3"
        label="Pitch 3"
        setVal={setPitch3}
        val={pitch3}
      />
      <LittleKnob
        className="middle-row pitch-correction-and-glide"
        label="Pitch Corr./Glide"
        setVal={setPitchCorrectionAndGlide}
        val={pitchCorrectionAndGlide}
      />
    </div>
  );
}
