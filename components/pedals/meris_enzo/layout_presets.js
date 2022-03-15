import FirstRow from "./first_row";
import SecondRow from "./second_row";
import ThirdRow from "./third_row";
import ModalOpenButton from "../../modal_open_button";
import { useState, useEffect, useContext } from "react";
import merisStateReducer from "../../../hooks/meris_state";
import { MidiConfigContext } from "../../../hooks/midi_config";
import sysexKnobsUpdate from "../../../hooks/sysex_knobs_update";
import parseSysexToBinary from "../../../utilities/parse_sysex";

export default function MerisEnzoLayoutPresets(props) {
  let { state, dispatch, midiObject, midiData } = props;

  // const applyExpression = () => {
  //   if (selectedPreset.label == null) {
  //     return;
  //   }
  //   if (midiObject && midiData.output && midiData.channel) {
  //     let { manufacturer, data } = parseSysexToBinary(selectedPreset.message);
  //     let deviceOutput = midiObject.outputs.filter((x) => {
  //       return x.name == midiData.output;
  //     })[0];
  //     let presetValWithExpression = data.map((_, i) => {
  //       if (i < 5) {
  //         return 0;
  //       } else {
  //         let x = data[i];
  //         let y = data[i + 17];
  //         return Math.floor(props.expressionVal * ((y - x) / 128)) + x;
  //       }
  //     });
  //     sysexKnobsUpdate({
  //       data: presetValWithExpression.slice(5, 22),
  //       dispatch: dispatch,
  //       expression: true,
  //     });
  //   }
  // };

  // useEffect(applyExpression, [
  //   expressionVal,
  //   selectedPreset,
  //   dispatch,
  //   midiData.output,
  // ]);

  return (
    <>
      <div className="meris-pedal meris-enzo-bigbox">
        <FirstRow
          midiObject={midiObject}
          enzoState={state}
          enzoDispatch={dispatch}
        />
        <SecondRow
          midiObject={midiObject}
          enzoState={state}
          enzoDispatch={dispatch}
        />
        <ThirdRow
          midiObject={midiObject}
          midiData={midiData}
          enzoState={state}
          enzoDispatch={dispatch}
        />
      </div>
    </>
  );
}
