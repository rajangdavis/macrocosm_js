import { useState, useEffect, useContext } from "react";
import merisStateReducer from "./meris_state";
import applyExpression from "./apply_expression";
import { MidiConfigContext } from "./midi_config";
import { PedalStatesContext } from "./pedal_states";
import { SelectedPedalContext } from "./selected_pedal_state";
import useLocalStorage from "./use_local_storage";

export default function PedalInit(
  midiObject,
  expressionVal,
  selectedPreset
) {
  const { midiConfig } = useContext(MidiConfigContext);
  const pedalStates = useContext(PedalStatesContext).pedalStates;
  const { selectedPedal, setSelectedPedal } = useContext(SelectedPedalContext)

  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`],
    output: midiConfig.output,
  };

  const [initialState, setState] = useLocalStorage("pedal_states", pedalStates);

  const pedalStateMap = {
    enzo: merisStateReducer(initialState["enzo"]),
    hedra: merisStateReducer(initialState["hedra"]),
    polymoon: merisStateReducer(initialState["polymoon"]),
    mercury7: merisStateReducer(initialState["mercury7"]),
    ottobitJr: merisStateReducer(initialState["ottobitJr"]),
  };

  const [selectedPedalState, selectedPedalDispatch] =
    pedalStateMap[selectedPedal];

  const dispatchFinal = (action)=>{
    console.log(action);
    let ccValue = action.key;
    let deviceOutput = midiObject.outputs.filter((x) => {
      return x.name == midiData.output;
    })[0];
    console.log(ccValue, action.value, { channels: midiData.channel });
    deviceOutput.sendControlChange(ccValue, action.value, {
      channels: parseInt(midiData.channel),
    });
    return selectedPedalDispatch(action);
  }

  useEffect(() => {
    let newPedalStates = { ...initialState };
    newPedalStates[selectedPedal] = selectedPedalState;
    setState(newPedalStates);
  }, [selectedPedalState, selectedPedal]);

  useEffect(() => {
    if (selectedPreset.label != null) {
      applyExpression(
        midiObject,
        midiData,
        expressionVal,
        selectedPreset,
        dispatchFinal
      );
    }
  }, [expressionVal, selectedPreset]);

  return [selectedPedalState, dispatchFinal, midiData];
}
