import cloneDeep from "lodash/cloneDeep";
import MacrosModalForm from "./macros_modal_form";
import { MacrosContext } from "../hooks/macro_state";
import { FactoryPresetsContext } from "../hooks/presets_state";
import { useContext, useState } from "react";

export default function MacrosModal(props) {
  const { factoryPresets } = useContext(FactoryPresetsContext);
  const { updateMacro } = useContext(MacrosContext);
  const { setMacrosModalOpen, setMacroToEdit, macroToEdit } =
    props;

  const copiedState = cloneDeep(macroToEdit);
  const [name, setName] = useState(copiedState.data.name);

  const findPresets = (pedal) => {
    return factoryPresets[pedal.name];
  };
  const [pedals, setPedalState] = useState(copiedState.data.pedals);

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
    let updatedData = {
      name: name,
      pedals: pedals,
    };
    updateMacro(macroToEdit.macro_id, updatedData)
    setMacrosModalOpen();
    setMacroToEdit(null);
  };

  const label = "UPDATE MACRO";

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
