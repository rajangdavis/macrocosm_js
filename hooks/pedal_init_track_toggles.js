import { useState, useEffect, useContext } from "react";
import merisStateReducer from "./meris_state";
import applyExpression from "./apply_expression";
import { MidiConfigContext } from "./midi_config";
import { PedalStatesContext } from "./pedal_states";
import { MacrosContext } from "./macro_state";
import { SelectedPedalContext } from "./selected_pedal_state";
import useLocalStorage from "./use_local_storage";
import callMacro from "../utilities/call_macro";

export default function PedalInitTrackToggles(
  midiObject,
  expressionVal,
  selectedPreset,
  setSelectedMacro
) {
  const { midiConfig } = useContext(MidiConfigContext);
  const pedalStates = useContext(PedalStatesContext).pedalStates;
  const macroStates = useContext(MacrosContext);
  const { selectedPedal, setSelectedPedal } = useContext(SelectedPedalContext);

  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`],
    output: midiConfig.output,
    input: midiConfig.input,
  };

  let deviceInput = midiObject.inputs.filter((x) => {
    return x.name == midiData.input;
  })[0];

  if (deviceInput && !deviceInput.hasListener("midimessage")) {
    console.log("listening");
    deviceInput.on("midimessage", function (event) {
      if (event.statusByte == 192) {
        let macroToCall = macroStates.macros[event.dataBytes[0]];
        if (macroToCall) {
          callMacro({
            macro: macroToCall,
            setSelectedMacro: setSelectedMacro,
            midiConfig: midiConfig,
            midiObject: midiObject,
          });
        }
      }
    });
  }

  const [initialState, setState] = useLocalStorage("pedal_states", pedalStates);

  const pedalStateMap = {
    enzo: merisStateReducer(initialState["enzo"]),
    hedra: merisStateReducer(initialState["hedra"]),
    polymoon: merisStateReducer(initialState["polymoon"]),
    mercury7: merisStateReducer(initialState["mercury7"]),
    ottobitJr: merisStateReducer(initialState["ottobitJr"]),
    mobius: merisStateReducer(initialState["mobius"]),
  };

  const [selectedPedalState, selectedPedalDispatch] =
    pedalStateMap[selectedPedal];

  const dispatchFinal = (action) => {
    let ccValue = action.key;
    let deviceOutput = midiObject.outputs.filter((x) => {
      return x.name == midiData.output;
    })[0];
    if (action.skipMidi != true) {
      console.log(ccValue, action.value, { channels: midiData.channel });
      deviceOutput.sendControlChange(ccValue, action.value, {
        channels: parseInt(midiData.channel),
      });
    }
    if (action.pcValue >= 0) {
      console.log(action.pcValue, { channels: midiData.channel });
      deviceOutput.sendProgramChange([action.pcValue], {
        channels: parseInt(midiData.channel),
      });
    }
    if (action.sysex) {
      console.log(action.sysex);
      deviceOutput.sendSysex(action.sysex.manufacturer, action.sysex.data);
    }
    return selectedPedalDispatch(action);
  };

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
