import { useState, useEffect, useContext } from "react";
import merisStateReducer from "./meris_state";
import applyExpression from "./apply_expression";
import { MidiConfigContext } from "./midi_config";
import { PedalStatesContext } from "./pedal_states";
import useLocalStorage from "./use_local_storage";

export default function PedalInit(
  midiObject,
  expressionVal,
  selectedPreset,
  selectedPedal
) {
  const { midiConfig } = useContext(MidiConfigContext);
  const pedalStates = useContext(PedalStatesContext).pedalStates;
  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`],
    output: midiConfig.output,
  };

  const [initialState, setState] = useLocalStorage("pedal_states", pedalStates);

  const pedalStateMap = {
    enzo: merisStateReducer(initialState["enzo"], {
      midiData: midiData,
      midiObject: midiObject,
    }),
    hedra: merisStateReducer(initialState["hedra"], {
      midiData: midiData,
      midiObject: midiObject,
    }),
    polymoon: merisStateReducer(initialState["polymoon"], {
      midiData: midiData,
      midiObject: midiObject,
    }),
    mercury7: merisStateReducer(initialState["mercury7"], {
      midiData: midiData,
      midiObject: midiObject,
    }),
    ottobitJr: merisStateReducer(initialState["ottobitJr"], {
      midiData: midiData,
      midiObject: midiObject,
    }),
  };

  const [selectedPedalState, selectedPedalDispatch] =
    pedalStateMap[selectedPedal];

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
        selectedPedalDispatch
      );
    }
  }, [expressionVal, applyExpression, selectedPreset]);

  return [selectedPedalState, selectedPedalDispatch];
}
