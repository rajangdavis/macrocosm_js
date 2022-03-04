import FirstRow from "./first_row";
import SecondRow from "./second_row";
import ThirdRow from "./third_row";
import ModalOpenButton from "../../modal_open_button";
import { useState, useEffect, useContext } from "react";
import merisStateReducer from "../../../hooks/meris_state";
import { MidiConfigContext } from "../../../hooks/midi_config";
import { PedalStatesContext } from "../../../hooks/pedal_states";
import useLocalStorage from "../../../hooks/use_local_storage";
import sysexKnobsUpdate from "../../../hooks/sysex_knobs_update";
import parseSysexToBinary from "../../../utilities/parse_sysex";

export default function MerisEnzoLayout(props) {
  let { midiObject, expressionVal, selectedPreset, selectedPedal } = props;

  const { midiConfig } = useContext(MidiConfigContext);
  const { enzo: enzoInitialState } = useContext(PedalStatesContext).pedalStates;

  const midiData = {
    channel: midiConfig.enzoChannel,
    output: midiConfig.output,
  };
  const [initialState, setState] = useLocalStorage(
    "enzo_state",
    enzoInitialState
  );
  const [enzoState, enzoDispatch] = merisStateReducer(initialState, {
    midiData: midiData,
    midiObject: midiObject,
  });

  useEffect(() => {
    setState(enzoState);
  }, [enzoInitialState, initialState, enzoState, setState]);

  const applyExpression = () => {
    if (selectedPreset.label == null) {
      return;
    }
    if (midiObject && midiData.output && midiData.channel) {
      let { manufacturer, data } = parseSysexToBinary(selectedPreset.message);
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiData.output;
      })[0];
      let presetValWithExpression = data.map((_, i) => {
        if (i < 5) {
          return 0;
        } else {
          let x = data[i];
          let y = data[i + 17];
          return Math.floor(props.expressionVal * ((y - x) / 128)) + x;
        }
      });
      sysexKnobsUpdate({
        data: presetValWithExpression.slice(5, 22),
        dispatch: enzoDispatch,
        expression: true,
      });
    }
  };

  useEffect(applyExpression, [
    expressionVal,
    selectedPreset,
    enzoDispatch,
    midiData.output,
  ]);

  if( selectedPedal =='enzo'){
	  return (
	    <div>
	      <div className="meris-pedal meris-enzo-bigbox">
	        <FirstRow
	          midiObject={midiObject}
	          enzoState={enzoState}
	          enzoDispatch={enzoDispatch}
	        />
	        <SecondRow
	          midiObject={midiObject}
	          enzoState={enzoState}
	          enzoDispatch={enzoDispatch}
	        />
	        <ThirdRow
	          midiObject={midiObject}
	          midiData={midiData}
	          enzoState={enzoState}
	          enzoDispatch={enzoDispatch}
	        />
	      </div>
	    </div>
	  );
  }else{
    return null;
  }
}
