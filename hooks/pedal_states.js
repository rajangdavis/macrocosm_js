import { useState, createContext } from "react";
import defaultConfig from "../data/pedal_states";

const PedalStatesContext = createContext(defaultConfig);

const PedalStatesProvider = ({ children, initialConfig = defaultConfig }) => {
  const [pedalStates, setPedalStates] = useState(defaultConfig);
  const updatePedalStates = (pedal, key, value) => {
    let copiedConfig = { ...pedalStates[pedal] };
    copiedConfig[key] = value;
    setPedalStates(copiedConfig);
  };

  return (
    <PedalStatesContext.Provider value={{ pedalStates, updatePedalStates }}>
      {children}
    </PedalStatesContext.Provider>
  );
};

module.exports = {
  PedalStatesContext: PedalStatesContext,
  PedalStatesProvider: PedalStatesProvider,
};
