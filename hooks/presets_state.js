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

  const replaceFactoryPresets = (pedal, presetIndex, updatedPreset) => {
    let copiedConfig = { ...factoryPresets };
    copiedConfig[pedal].splice(presetIndex, 1, updatedPreset);
    setFactoryPresets(copiedConfig);
  };

  const deleteFactoryPreset = (pedal, presetIndex) => {
    let copiedConfig = { ...factoryPresets };
    copiedConfig[pedal].splice(presetIndex, 1);
    setFactoryPresets(copiedConfig);
  };

  return (
    <FactoryPresetsContext.Provider
      value={{
        factoryPresets,
        updateFactoryPresets,
        replaceFactoryPresets,
        deleteFactoryPreset,
      }}
    >
      {children}
    </FactoryPresetsContext.Provider>
  );
};

module.exports = {
  FactoryPresetsContext: FactoryPresetsContext,
  FactoryPresetsProvider: FactoryPresetsProvider,
};
