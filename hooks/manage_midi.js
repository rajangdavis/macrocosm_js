import { useContext, useEffect, useState } from "react";
import { MidiConfigContext } from "./midi_config";
import { WebMidiContext } from "./web_midi_state";

const checkForDisconnect = function (output, updateConfig, setIsConnected) {
  if (output && output.state) {
    if (output.state == "connected") {
      setIsConnected(true);
    } else {
      setIsConnected(false);
      updateConfig("output", "");
    }
  } else {
    setIsConnected(false);
    updateConfig("output", "");
  }
};

export default function ManageMidi() {
  let [isConnected, setIsConnected] = useState(false);
  let { midiObject } = useContext(WebMidiContext);
  let { midiConfig, updateConfig } = useContext(MidiConfigContext);

  useEffect(() => {
    if (midiObject && midiObject.getOutputByName && midiConfig.output != "") {
      let savedOutput = midiObject.getOutputByName(midiConfig.output);
      checkForDisconnect(savedOutput, updateConfig, setIsConnected);
    }
  }, [midiObject, midiConfig]);

  let isSupported = midiObject && midiObject.supported;
  let canView = isConnected && isSupported;

  return [midiObject, midiConfig, isConnected, isSupported, canView];
}
