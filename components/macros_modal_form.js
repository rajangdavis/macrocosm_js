import CloseButton from "./close_button";
import CustomSelect from "./custom_select";
import MacrosPedalSelector from "./macros_pedal_selector";
import MacrosDeviceSelector from "./macros_device_selector";
import { MidiConfigContext } from "../hooks/midi_config";
import { useContext, useState } from "react";

function PcMessageInput(props) {
  const { midiConfig } = useContext(MidiConfigContext);
  let { label, channel, midiObject } = props;
  let [inputState, setInputState] = useState(0);

  let update = function (val) {
    let newVal = inputState + val;
    let newState = newVal < 0 ? 0 : newVal > 127 ? 127 : newVal;
    setInputState(newState);
    let deviceOutput = midiObject.outputs.filter((x) => {
      return x.name == midiConfig.output;
    })[0];
    console.log(newState, { channels: midiConfig[channel] });
    deviceOutput.sendProgramChange(newState, {
      channels: parseInt(midiConfig[channel]),
    });
  };

  return (
    <div className="flex-row">
      <label onClick={() => update(-1)}>-</label>
      <label>
        {label}: {inputState}
      </label>
      <label onClick={() => update(1)}>+</label>
    </div>
  );
}

export default function MacrosModalForm(props) {
  let {
    label,
    setMacrosModalOpen,
    setName,
    name,
    pedals,
    setPedalState,
    findPresets,
    midiObject,
    showOrHidePedal,
    saveMacro,
    devices,
    // setDevicesState,
    // findDevice,
    // findDeviceIndex,
    showOrHideDevice,
  } = props;

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
                  // Set something up for the PC Message bounds
                  // it might make sense to think about
                  // what types of commands you need to send
                  // for each device...

                  // Also, you may need to refactor things
                  // But build it first
                  // then build it right

                  {
                    /*let options = findPresets(pedal).map((x) => x.label);
                  let setSelectedPreset = (option) => {
                    let copiedPedalsConfig = [...devices];
                    copiedPedalsConfig[index].selectedPreset = optionVals;
                    setPedalState(copiedPedalsConfig);
                  };*/
                  }
                  return (
                    <PcMessageInput
                      key={index}
                      midiObject={midiObject}
                      label={device.name}
                      channel={`${device.name}Channel`}
                    />
                  );
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
