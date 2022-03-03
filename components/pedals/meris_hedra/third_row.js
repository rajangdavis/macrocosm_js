import { LittleKnob } from "../knob";
import DelayMode from "./delay_mode";
import Bypass from "../bypass";
import VolumeSwellEnable from "./volume_swell_enable";
import HalfspeedEnable from "./halfspeed_enable";
import PitchControlSmoothing from "./pitch_control_smoothing";
import TapButton from "../tap_button";

export default function ThirdRow(props) {
  let {
    14: bypass,
    15: tempo,
    25: timeDivision1,
    26: timeDivision2,
    27: timeDivision3,
    31: volumeSwellEnable,
    29: delayMode,
    9: halfspeedEnable,
    30: pitchControlSmoothing,
  } = props.hedraState;

  let setTimeDivision1 = (value) => {
    props.hedraDispatch({ key: 25, value: value });
  };

  let setTimeDivision2 = (value) => {
    props.hedraDispatch({ key: 26, value: value });
  };

  let setTimeDivision3 = (value) => {
    props.hedraDispatch({ key: 27, value: value });
  };

  return (
    <div className="flex-row third-row">
      <div className="flex-row left-side-controls">
        <div className="on-off-row">
          <VolumeSwellEnable
            volumeSwellEnable={volumeSwellEnable}
            dispatch={props.hedraDispatch}
          />
          <HalfspeedEnable
            halfspeedEnable={halfspeedEnable}
            dispatch={props.hedraDispatch}
          />
          <PitchControlSmoothing
            pitchControlSmoothing={pitchControlSmoothing}
            dispatch={props.hedraDispatch}
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
          className="td1"
          label="Time Division 1"
          setVal={setTimeDivision1}
          val={timeDivision1}
        />
        <LittleKnob
          className="td2"
          label="Time Division 2"
          setVal={setTimeDivision2}
          val={timeDivision2}
        />
        <LittleKnob
          className="td3"
          label="Time Division 3"
          setVal={setTimeDivision3}
          val={timeDivision3}
        />
      </div>
      <div className="right-side-controls">
        <div className="flex-row first-row">
          <DelayMode
            hedraDispatch={props.hedraDispatch}
            delayMode={delayMode}
          />
        </div>
        <Bypass bypass={bypass} dispatch={props.hedraDispatch} />
      </div>
    </div>
  );
}
