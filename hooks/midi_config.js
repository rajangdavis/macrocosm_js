import { createContext, useState } from "react";
import useLocalStorage from "./use_local_storage";
const defaultConfig = {
  output: "",
  inputForExpression: "",
  enzoChannel: 1,
  hedraChannel: 2,
  polymoonChannel: 3,
  mercury7Channel: 4,
  ottobitJrChannel: 5,
  mobiusChannel: 6,
  es8Channel: 7,
};

const MidiConfigContext = createContext(defaultConfig);

const MidiConfigProvider = ({ children, initialConfig = defaultConfig }) => {
  const [midiConfig, setMidiConfig] = useLocalStorage(
    "midi_config",
    initialConfig
  );
  const updateConfig = (key, value) => {
    let copiedConfig = { ...midiConfig };
    copiedConfig[key] = value;
    setMidiConfig(copiedConfig);
  };

  return (
    <MidiConfigContext.Provider value={{ midiConfig, updateConfig }}>
      {children}
    </MidiConfigContext.Provider>
  );
};

module.exports = {
  MidiConfigContext: MidiConfigContext,
  MidiConfigProvider: MidiConfigProvider,
};
