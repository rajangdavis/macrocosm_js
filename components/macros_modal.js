import MacrosModalForm from "./macros_modal_form";
import { FactoryPresetsContext } from "../hooks/presets_state";
import { useContext, useState } from "react";

export default function MacrosModal(props) {
  const { factoryPresets } = useContext(FactoryPresetsContext);
  const [name, setName] = useState("New Macro");

  const { macroDispatch, setMacrosModalOpen } = props;

  let PEDALS = Object.keys(factoryPresets);

  let PEDAL_OBJECTS = PEDALS.map((pedal) => {
    return {
      name: pedal,
      showing: false,
      selectedPreset: {},
    };
  });

  const findPresets = (pedal) => {
    return factoryPresets[pedal.name];
  };
  const [pedals, setPedalState] = useState(PEDAL_OBJECTS);

  const findPedalObject = (pedal) => pedals.filter((x) => x.name == pedal)[0];
  const findPedalObjectIndex = (pedal) =>
    pedals.indexOf(findPedalObject(pedal));

  const showOrHidePedal = (pedal) => {
    let pedalMatch = findPedalObjectIndex(pedal.name);
    let updatedState = pedals.map((pedal, index) => {
      if (index == pedalMatch) {
        pedal.showing = !pedal.showing;
      }
      return pedal;
    });
    setPedalState(updatedState);
  };

  const saveMacro = () => {
    let defaultHash = {
      name: name,
      pedals: pedals,
    };
    macroDispatch({ type: "create-macro", data: defaultHash });
    setMacrosModalOpen();
  };

  const label = "CREATE A MACRO";

  return (
    <MacrosModalForm
      label={label}
      setMacrosModalOpen={setMacrosModalOpen}
      setName={setName}
      name={name}
      pedals={pedals}
      setPedalState={setPedalState}
      findPresets={findPresets}
      showOrHidePedal={showOrHidePedal}
      saveMacro={saveMacro}
    />
  );
}
