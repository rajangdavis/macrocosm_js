import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";
import useLocalStorage from "./use_local_storage";

const defaultConfig = []

const MacrosContext = createContext(defaultConfig);
const MacrosProvider = ({
  children,
  initialConfig = defaultConfig,
}) => {
  
  const [macros, setMacros] = useLocalStorage(
    "macro_state",
    defaultConfig
  );

  // CREATE
  let createMacro = (data) => {
  	let copiedConfig = cloneDeep(macros);
    let initialMacroState = {
      macro_id: uuidv4(),
      data: data,
    };
    copiedConfig.push(initialMacroState)
    setMacros(copiedConfig)
  };

  let cloneMacro = (macroId) => {
  	let copiedConfig = cloneDeep(macros);
    let [index, macro] = readMacro(macroId);
    let clone = cloneDeep(macro);
    clone.macro_id = uuidv4();
    clone.data.name = `Clone of ${clone.data.name}`;
    copiedConfig.push(clone)
    setMacros(copiedConfig)
  };

  // READ
  let readMacro = (macroId) => {
    let macro = macros.filter((x) => x.macro_id == macroId)[0];
    let index = macros.findIndex((x) => x.macro_id == macroId);
    return [index, macro];
  };

  // UPDATE
  let updateMacro = (macroId, updatedData) => {
  	let copiedConfig = cloneDeep(macros);
    let [index, macro] = readMacro(macroId);
    macro.data = updatedData;
    copiedConfig.splice(index, 1, macro);
    setMacros(copiedConfig)
  };

  // DESTROY
  let removeMacro = (macroId) => {
  	let copiedConfig = cloneDeep(macros);
    let newState = copiedConfig.filter((x) => x.macro_id != macroId)
    setMacros(newState)
  };

  return (
    <MacrosContext.Provider
      value={{
        macros,
        createMacro,
        cloneMacro,
        updateMacro,
        removeMacro
      }}
    >
      {children}
    </MacrosContext.Provider>
  );
};

module.exports = {
  MacrosContext: MacrosContext,
  MacrosProvider: MacrosProvider,
};
