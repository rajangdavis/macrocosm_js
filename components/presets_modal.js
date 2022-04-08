import CloseButton from "./close_button";
import Expression from "./expression";
import PresetsBuilder from "./presets_builder";
import PresetsEditor from "./presets_editor";
import NavMenu from "./nav_menu";
import GlobalSettingsTable from "./global_settings_table";
import merisStateReducer from "../hooks/meris_state";
import { useContext, useState, useEffect } from "react";
import { MidiConfigContext } from "../hooks/midi_config";
import { PedalStatesContext } from "../hooks/pedal_states";
import { FactoryPresetsContext } from "../hooks/presets_state";
import useLocalStorage from "../hooks/use_local_storage";
import sysexKnobsUpdate from "../hooks/sysex_knobs_update";
import parseSysexToBinary from "../utilities/parse_sysex";

export default function PresetsModal(props) {
  const { midiConfig } = useContext(MidiConfigContext);
  const { pedalStates } = useContext(PedalStatesContext);
  const { factoryPresets } = useContext(FactoryPresetsContext);
  const [presetExpressionVal, setPresetExpressionVal] = useState(0);
  const [presetToEdit, setPresetToEdit] = useState(null);
  const [presetToEditIndex, setPresetToEditIndex] = useState(null);
  const defaultMenu = midiConfig.output ? "presets" : "midi";
  const [menu, setMenu] = useState(defaultMenu);

  const {
    midiObject,
    sysexByte,
    selectedPedal,
    selectedPreset,
    setSelectedPreset,
    setPresetsOpen,
  } = props;

  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`],
    output: midiConfig.output,
    sysexByte: sysexByte,
  };

  const [_, dispatch] = merisStateReducer(pedalStates[selectedPedal], {
    midiData: midiData,
    midiObject: midiObject,
  });

  const { deleteFactoryPreset, updateFactoryPresets } = useContext(
    FactoryPresetsContext
  );

  const setPreset = (e, preset) => {
    if (midiObject && midiData.output && midiData.channel) {
      let { manufacturer, data } = parseSysexToBinary(preset.message);
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiData.output;
      })[0];
      deviceOutput.sendSysex(manufacturer, data);
      sysexKnobsUpdate({
        data: data.slice(5, 22),
        dispatch: dispatch,
        expression: false,
      });
      setSelectedPreset(preset);
    }
  };

  const clonePreset = (preset) => {
    let presetClone = {
      label: `Clone of ${preset.label}`,
      message: preset.message,
    };
    updateFactoryPresets(selectedPedal, presetClone);
  };

  const editPreset = (preset, i) => {
    setPresetToEdit(preset);
    setPresetToEditIndex(i);
    setMenu("edit-preset");
  };

  const deletePreset = (i) => {
    deleteFactoryPreset(selectedPedal, i);
  };

  const selectedClassName = (preset) => {
    if (preset.label == selectedPreset.label) {
      return "selected preset-row";
    } else {
      return "preset-row";
    }
  };

  const selectedMenu = (menuLink) => {
    if (menuLink == menu) {
      return "selected menu-link";
    } else {
      return "menu-link";
    }
  };

  const skipOgPresets = (index) => {
    let presetsLength = factoryPresets[selectedPedal].length;
    if (presetsLength > 16) {
      if (index + 16 < presetsLength) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div className="presets-modal zoom-in">
      <div className="menu-select">
        <CloseButton setHeaderOpen={setPresetsOpen} headerOpen={true} />
        <a
          className={selectedMenu("midi")}
          onClick={() => {
            setMenu("midi");
          }}
        >
          MIDI AND CONTROLS
        </a>
        {midiData.output && (
          <a
            className={selectedMenu("presets")}
            onClick={() => {
              setMenu("presets");
            }}
          >
            PEDAL PRESETS AND SETTINGS
          </a>
        )}
        {midiData.output && (
          <a
            className={selectedMenu("new-preset")}
            onClick={(e) => {
              setMenu("new-preset");
            }}
          >
            CREATE NEW PRESET
          </a>
        )}
      </div>
      <div className="presets-modal-background"></div>
      <div className="presets-modal-content">
        <div>
          {menu == "midi" && <NavMenu midiObject={midiObject} />}
          {menu == "presets" && (
            <div className="sysex-menu fade-in">
              <div className="global-settings">
                <label>GLOBAL SETTINGS</label>
                <GlobalSettingsTable
                  sysexByte={sysexByte}
                  midiObject={midiObject}
                />
              </div>
              <div className="presets-container">
                <label>PRESETS</label>
                {factoryPresets[selectedPedal].map((preset, i) => {
                  return (
                    <div key={i} className={selectedClassName(preset)}>
                      <a onClick={(e) => setPreset(e, preset)}>
                        {preset.label}
                      </a>
                      <span className="pull-right">
                        {skipOgPresets(i) && (
                          <>
                            <a onClick={(e) => editPreset(preset, i)}>EDIT</a> |{" "}
                          </>
                        )}
                        <a onClick={(e) => clonePreset(preset)}>CLONE</a>
                        {skipOgPresets(i) && <> | </>}
                        {skipOgPresets(i) && (
                          <>
                            <a onClick={(e) => deletePreset(preset)}>DELETE</a>
                          </>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {menu == "new-preset" && (
            <PresetsBuilder
              selectedPedal={selectedPedal}
              midiObject={midiObject}
              midiData={midiData}
              setMenu={setMenu}
              expressionVal={presetExpressionVal}
            />
          )}
          {menu == "edit-preset" && (
            <PresetsEditor
              selectedPedal={selectedPedal}
              midiObject={midiObject}
              midiData={midiData}
              setMenu={setMenu}
              presetToEdit={presetToEdit}
              presetToEditIndex={presetToEditIndex}
              expressionVal={presetExpressionVal}
              setExpressionVal={setPresetExpressionVal}
            />
          )}
        </div>
      </div>
      <div className="menu-select right">
        {(menu == "new-preset" || menu == "edit-preset") && (
          <Expression
            expressionVal={presetExpressionVal}
            setExpressionVal={setPresetExpressionVal}
            midiData={midiData}
            midiObject={midiObject}
            tempo={0}
          />
        )}
      </div>
    </div>
  );
}
