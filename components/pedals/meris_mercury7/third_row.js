import { LittleKnob } from "../knob";
import SwellButton from "../swell_button";
import ReverbAlgorithm from "./reverb_algorithm";
import Bypass from "../bypass";

export default function ThirdRow(props) {
  let {
    26: attackTime,
    23: modSpeed,
    29: reverbAlgorithm,
    14: bypass,
    28: swell,
  } = props.mercury7State;

  let setAttackTime = (value) => {
    props.mercury7Dispatch({ key: 26, value: value });
  };

  let setModSpeed = (value) => {
    props.mercury7Dispatch({ key: 23, value: value });
  };

  return (
    <div className="flex-row">
      <div className="left-side-controls">
        <div className="flex-row tap">
          <SwellButton
            swell={swell}
            midiData={props.midiData}
            midiObject={props.midiObject}
            mercury7Dispatch={props.mercury7Dispatch}
          />
        </div>
      </div>
      <div className="flex-row middle-controls">
        <LittleKnob
          className="mod-speed"
          label="mod speed"
          setVal={setModSpeed}
          val={modSpeed}
        />
        <LittleKnob
          className="attack-time"
          label="Attack Time"
          setVal={setAttackTime}
          val={attackTime}
        />
      </div>
      <div className="right-side-controls">
        <div className="flex-row first-row">
          <ReverbAlgorithm
            reverbAlgorithm={reverbAlgorithm}
            mercury7Dispatch={props.mercury7Dispatch}
          />
        </div>
        <Bypass bypass={bypass} dispatch={props.mercury7Dispatch} />
      </div>
    </div>
  );
}
