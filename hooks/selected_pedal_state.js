import { createContext } from "react";
import useLocalStorage from "./use_local_storage";
const defaultConfig = "enzo";

const SelectedPedalContext = createContext(defaultConfig);

const SelectedPedalProvider = ({ children, initialConfig = defaultConfig }) => {
  const [selectedPedal, setSelectedPedal] = useLocalStorage(
    "selected_pedal",
    defaultConfig
  );

  return (
    <SelectedPedalContext.Provider value={{ selectedPedal, setSelectedPedal }}>
      {children}
    </SelectedPedalContext.Provider>
  );
};

module.exports = {
  SelectedPedalContext: SelectedPedalContext,
  SelectedPedalProvider: SelectedPedalProvider,
};
