import CloseButton from "./close_button";
import NavMenu from "./nav_menu";
import CustomSelect from "./custom_select";
import GlobalSettingsTable from "./global_settings_table";
import { FactoryPresetsContext } from "../hooks/presets_state";
import { useContext, useState, useEffect } from "react";

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
              <label>CREATE A MACRO</label>
              <div>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>

              {pedals.map((pedal, index) => {
                return (
                  <a
                    key={index}
                    href="#"
                    onClick={() => {
                      showOrHidePedal(pedal);
                    }}
                  >
                    {pedal.name}
                  </a>
                );
              })}
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
                        options={options}
                        defaultOption={pedal.selectedPreset.label}
                        onChange={setSelectedPreset}
                      />
                    </div>
                  );
                }
              })}
              <div>
                <button onClick={saveMacro}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
