import CloseButton from "./close_button";
import CustomSelect from "./custom_select";
import MacrosPedalSelector from "./macros_pedal_selector";
import MacrosDeviceSelector from "./macros_device_selector";
import { PcMessageInput, PcMessageInputWithCc } from "./pc_message_input";
import { MidiConfigContext } from "../hooks/midi_config";
import { useContext } from "react";

export default function MacrosModalForm(props) {
  let {
    label,
    setMacrosModalOpen,
    setName,
    name,
    pedals,
    setPedalState,
    findPresets,
    showOrHidePedal,
    saveMacro,
    devices,
    setDevicesState,
    showOrHideDevice,
  } = props;

  let { midiConfig } = useContext(MidiConfigContext);
  let canView = (device) => {
    return parseInt(midiConfig[`${device}Channel`]) > 0;
  };

  let maxPcValue = {
    mobius: 199,
    es8: 127,
    quadCortex: 127 * 2,
  };

  let minPcValue = {
    mobius: 0,
    es8: 0,
    quadCortex: -1,
  };

  return (
    <div className="presets-modal zoom-in">
      <div className="menu-select">
        <CloseButton setHeaderOpen={setMacrosModalOpen} headerOpen={true} />
        <a className="menu-link">{}</a>
      </div>
      <div className="presets-modal-background"></div>
      <div className="presets-modal-content">
        <div>
          <div className="sysex-menu fade-in">
            <div className="presets-container">
              <label>{label}</label>
              <div className="text-input">
                <span>NAME</span>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
              <MacrosPedalSelector
                showOrHidePedal={showOrHidePedal}
                pedals={pedals}
              />
              <MacrosDeviceSelector
                showOrHidePedal={showOrHideDevice}
                pedals={devices}
              />
              {pedals
                .filter((x) => x.name != "mobius")
                .map((pedal, index) => {
                  if (pedal.showing) {
                    let options = findPresets(pedal).map((x) => x.label);
                    let setSelectedPreset = (option) => {
                      let copiedPedalsConfig = [...pedals];
                      let optionVals = findPresets(pedal).filter(
                        (x) => x.label == option
                      )[0];
                      copiedPedalsConfig[index].selectedPreset = optionVals;
                      setPedalState(copiedPedalsConfig);
                    };
                    return (
                      <div key={index} className="options-block">
                        <CustomSelect
                          inputLabel={`${pedal.name} Preset`}
                          options={options}
                          defaultOption={pedal.selectedPreset.label}
                          onChange={setSelectedPreset}
                        />
                      </div>
                    );
                  }
                })}
              {devices.map((device, index) => {
                if (device.showing) {
                  let setSelectedPreset = (value) => {
                    let copiedDevicesConfig = [...devices];
                    copiedDevicesConfig[index].selectedPreset = value;
                    setDevicesState(copiedDevicesConfig);
                  };
                  let setSelectedCcVal = (value) => {
                    let copiedDevicesConfig = [...devices];
                    copiedDevicesConfig[index].selectedCcVal = value;
                    setDevicesState(copiedDevicesConfig);
                  };
                  if (device.name == "quadCortex" && canView(device.name)) {
                    return (
                      <PcMessageInputWithCc
                        device={device}
                        key={index}
                        setSelectedCcVal={setSelectedCcVal}
                        setSelectedPreset={setSelectedPreset}
                        maxValue={maxPcValue[device.name]}
                        minValue={minPcValue[device.name]}
                      />
                    );
                  } else {
                    return (
                      canView(device.name) && (
                        <PcMessageInput
                          device={device}
                          key={index}
                          setSelectedPreset={setSelectedPreset}
                          maxValue={maxPcValue[device.name]}
                          minValue={minPcValue[device.name]}
                        />
                      )
                    );
                  }
                }
              })}
              <br />
              <div className="flex-row">
                <button className="save-button" onClick={saveMacro}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
