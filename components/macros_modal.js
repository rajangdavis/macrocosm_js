import MacrosModalForm from "./macros_modal_form";
import { FactoryPresetsContext } from "../hooks/presets_state";
import { MacrosContext } from "../hooks/macro_state";
import { useContext, useState } from "react";

export default function MacrosModal(props) {
  const { factoryPresets } = useContext(FactoryPresetsContext);
  const { createMacro } = useContext(MacrosContext);
  const [name, setName] = useState("New Macro");

  const { setMacrosModalOpen, midiObject } = props;

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

  // let DEVICES = ['strymon', 'es8', 'quadCortex']

  // let DEVICE_OBJECTS = DEVICES.map((device) => {
  //   return {
  //     name: device,
  //     showing: false,
  //     selectedPreset: {},
  //   };
  // });

  // const [devices, setDevicesState] = useState(deviceDefaultState);
  // const findDeviceObject = (device) => devices.filter((x) => x.name == device)[0];
  // const findDeviceObjectIndex = (device) =>
  //   devices.indexOf(findDeviceObject(device));

  // const showOrHideDevice = (device) => {
  //   let deviceMatch = findDeviceObjectIndex(device.name);
  //   let updatedState = devices.map((device, index) => {
  //     if (index == deviceMatch) {
  //       device.showing = !device.showing;
  //     }
  //     return device;
  //   });
  //   setDeviceState(updatedState);
  // };

  // console.log(devices)

  const saveMacro = () => {
    let defaultHash = {
      name: name,
      pedals: pedals,
    };
    createMacro(defaultHash);
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
      midiObject={midiObject}
      setPedalState={setPedalState}
      findPresets={findPresets}
      showOrHidePedal={showOrHidePedal}
      saveMacro={saveMacro}
    />
  );
}
