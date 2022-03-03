import { LittleKnob } from "../knob";
import DottedEighth from "./dotted_eighth";
import HalfSpeed from "./half_speed";
import TapButton from "../tap_button";
import FlangerFeedback from "./flanger_feedback";
import PhaserMode from "./phaser_mode";
import Bypass from "../bypass";

export default function ThirdRow(props) {
  let {
    26: dynamicFlangerMode,
    31: halfSpeed,
    9: dottedEighth,
    23: feedbackFilter,
    30: flangerFeedback,
    29: phaserMode,
    14: bypass,
    15: tempo,
  } = props.polymoonState;

  let setDynamicFlangerMode = (value) => {
    props.polymoonDispatch({ key: 26, value: value });
  };

  let setFeedbackFilter = (value) => {
    props.polymoonDispatch({ key: 23, value: value });
  };

  return (
    <div className="flex-row">
      <div className="left-side-controls">
        <div className="flex-row first-row">
          <DottedEighth
            dottedEighth={dottedEighth}
            polymoonDispatch={props.polymoonDispatch}
          />
          <HalfSpeed
            halfSpeed={halfSpeed}
            polymoonDispatch={props.polymoonDispatch}
          />
          <FlangerFeedback
            flangerFeedback={flangerFeedback}
            polymoonDispatch={props.polymoonDispatch}
          />
        </div>
        <div className="flex-row tap">
          <TapButton
            tempo={tempo}
            midiData={props.midiData}
            midiObject={props.midiObject}
          />
        </div>
      </div>
      <div className="flex-row middle-controls">
        <LittleKnob
          className="feedback-filter"
          label="feedback filter"
          setVal={setFeedbackFilter}
          val={feedbackFilter}
        />
        <LittleKnob
          className="dynamic-flanger-mode"
          label="Dynamic Flanger Mode"
          setVal={setDynamicFlangerMode}
          val={dynamicFlangerMode}
        />
      </div>
      <div className="right-side-controls">
        <div className="flex-row first-row">
          <PhaserMode
            phaserMode={phaserMode}
            polymoonDispatch={props.polymoonDispatch}
          />
        </div>
        <Bypass bypass={bypass} dispatch={props.polymoonDispatch} />
      </div>
    </div>
  );
}
