import { useState, createContext } from "react";
import defaultConfig from "../data/factory_presets";

const FactoryPresetsContext = createContext(defaultConfig);

const FactoryPresetsProvider = ({
  children,
  initialConfig = defaultConfig,
}) => {
  const [factoryPresets, setFactoryPresets] = useState(defaultConfig);
  const updateFactoryPresets = (key, value) => {
    let copiedConfig = { ...factoryPresets };
    copiedConfig[key] = value;
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
