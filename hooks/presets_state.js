import { useState, createContext } from "react";
import useLocalStorage from "./use_local_storage";
import defaultConfig from "../data/factory_presets";

const FactoryPresetsContext = createContext(defaultConfig);

const FactoryPresetsProvider = ({
  children,
  initialConfig = defaultConfig,
}) => {
  const [factoryPresets, setFactoryPresets] = useLocalStorage(
    "presets_state",
    defaultConfig
  );
  const updateFactoryPresets = (pedal, newPreset) => {
    let copiedConfig = { ...factoryPresets };
    copiedConfig[pedal].unshift(newPreset);
    setFactoryPresets(copiedConfig);
  };

  return (
    <FactoryPresetsContext.Provider
      value={{ factoryPresets, updateFactoryPresets }}
    >
      {children}
    </FactoryPresetsContext.Provider>
  );
};

module.exports = {
  FactoryPresetsContext: FactoryPresetsContext,
  FactoryPresetsProvider: FactoryPresetsProvider,
};
