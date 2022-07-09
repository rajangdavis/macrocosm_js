import CloseButton from "./close_button";
import CustomSelect from "./custom_select";
import MacrosPedalSelector from "./macros_pedal_selector";
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
    midiObject,
    showOrHidePedal,
    saveMacro,
  } = props;

  const { midiConfig } = useContext(MidiConfigContext);
  const midiData = {
    channel: midiConfig["es8Channel"],
    output: midiConfig.output,
  };

  const sendChange = (e) => {
    let pcNumber = parseInt(e.target.value);
    let deviceOutput = midiObject.outputs.filter((x) => {
      return x.name == midiData.output;
    })[0];
    console.log(pcNumber, { channels: midiData.channel });
    deviceOutput.sendProgramChange(pcNumber, {
      channels: parseInt(midiData.channel),
    });
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
              {pedals.map((pedal, index) => {
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
              <div>
                <input type="number" min="0" max="127" onChange={sendChange} />
              </div>
              <div>
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
