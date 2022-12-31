import CloseButton from "./close_button";
import CustomSelect from "./custom_select";
import MacrosPedalSelector from "./macros_pedal_selector";
import MacrosDeviceSelector from "./macros_device_selector";

function PcMessageInput(props) {
  let { device, setSelectedPreset, maxValue, minValue } = props;

  let update = function (val) {
    if (val.change) {
      let defaultVal = device.selectedPreset ? device.selectedPreset : 0;
      var newVal = defaultVal + val.by;
    } else if (val.overwrite) {
      var newVal = parseInt(val.overwrite);
    }
    var newState =
      newVal < minValue ? minValue : newVal > maxValue ? maxValue : newVal;
    setSelectedPreset(newState);
  };

  return (
    <div className="flex-row device-input-container">
      <label onClick={() => update({ change: true, by: -1 })}>-</label>
      <label className={"device-input"}>
        <span>{device.name}:</span>
        <input
          type="number"
          value={device.selectedPreset}
          onChange={(e) => {
            update({ overwrite: e.target.value });
          }}
        />
      </label>
      <label onClick={() => update({ change: true, by: 1 })}>+</label>
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
    showOrHidePedal,
    saveMacro,
    devices,
    setDevicesState,
    showOrHideDevice,
  } = props;

  let maxPcValue = {
    mobius: 199,
    es8: 127,
    quadCortex: 127 * 2,
  };

  let minPcValue = {
    mobius: 0,
    es8: 0,
    quadCortex: 0,
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

                  return (
                    <PcMessageInput
                      device={device}
                      key={index}
                      setSelectedPreset={setSelectedPreset}
                      maxValue={maxPcValue[device.name]}
                      minValue={minPcValue[device.name]}
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
