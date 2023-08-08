import cloneDeep from "lodash/cloneDeep";
import MacrosModalForm from "./macros_modal_form";
import { MacrosContext } from "../hooks/macro_state";
import { FactoryPresetsContext } from "../hooks/presets_state";
import { useContext, useState } from "react";

export default function MacrosModal(props) {
  const { factoryPresets } = useContext(FactoryPresetsContext);
  const { updateMacro } = useContext(MacrosContext);
  const { setMacrosModalOpen, setMacroToEdit, macroToEdit } = props;

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
        pedal.selectedPreset = {};
      }
      return pedal;
    });
    setPedalState(updatedState);
  };

  const deviceDefaultState =
    copiedState.data.devices == undefined ? [] : copiedState.data.devices;

  const [devices, setDevicesState] = useState(deviceDefaultState);
  const findDevice = (device) => devices.filter((x) => x.name == device)[0];
  const findDeviceIndex = (device) => devices.indexOf(findDevice(device));

  const showOrHideDevice = (device) => {
    let deviceMatch = findDeviceIndex(device.name);
    let updatedState = devices.map((device, index) => {
      if (index == deviceMatch) {
        device.showing = !device.showing;
      }
      return device;
    });
    setDevicesState(updatedState);
  };

  const saveMacro = () => {
    let updatedData = {
      name: name,
      pedals: pedals,
      devices: devices,
    };
    updateMacro(macroToEdit.macro_id, updatedData);
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
      devices={devices}
      setDevicesState={setDevicesState}
      showOrHideDevice={showOrHideDevice}
    />
  );
}
