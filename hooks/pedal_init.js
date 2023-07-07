import { useState, useEffect, useContext } from "react";
import applyExpression from "./apply_expression";
import computeSysex from "../utilities/compute_sysex";
import { MidiConfigContext } from "./midi_config";

import { MacrosContext } from "./macro_state";
import { SelectedPedalContext } from "./selected_pedal_state";
import useLocalStorage from "./use_local_storage";
import callMacro from "../utilities/call_macro";

export default function PedalInit(
  initialState,
  setState,
  selectedPedalState,
  selectedPedalDispatch,
  midiObject,
  expressionVal,
  selectedPreset,
  setSelectedMacro,
  sysexByte,
  changeTlr,
  changeBlr
) {
  const { midiConfig } = useContext(MidiConfigContext);
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

  let detectExpressionLowAndHigh = (parsedVal) => {
    console.log("selectedPedalState", selectedPedalState);
    if (parsedVal === 0) {
      changeBlr(true);
      console.log("at the bottom");
    } else if (parsedVal === 127) {
      changeTlr(true);
      console.log("at the top");
    } else {
      changeTlr(false);
      changeBlr(false);
    }
  };

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
    applyExpression(
      midiObject,
      midiData,
      expressionVal,
      selectedPreset,
      dispatchFinal,
      detectExpressionLowAndHigh
    );
  }, [expressionVal]);

  return [dispatchFinal, midiData];
}
