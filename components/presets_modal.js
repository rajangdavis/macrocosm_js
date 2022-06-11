import CloseButton from "./close_button";
import Expression from "./expression";
import PresetsBuilder from "./presets_builder";
import PresetsEditor from "./presets_editor";
import NavMenu from "./nav_menu";
import GlobalSettingsTable from "./global_settings_table";
import { useContext, useState, useEffect } from "react";
import { MidiConfigContext } from "../hooks/midi_config";
import { FactoryPresetsContext } from "../hooks/presets_state";
import sysexKnobsUpdate from "../hooks/sysex_knobs_update";
import parseSysexToBinary from "../utilities/parse_sysex";

export default function PresetsModal(props) {
  const { midiConfig } = useContext(MidiConfigContext);
  const { factoryPresets } = useContext(FactoryPresetsContext);
  const [presetExpressionVal, setPresetExpressionVal] = useState(0);
  const [presetTempo, setPresetTempoVal] = useState(0);
  const [presetToEdit, setPresetToEdit] = useState(null);
  const [presetToEditIndex, setPresetToEditIndex] = useState(null);
  const [heelSettingsConfirmed, setHeelSettingsConfirmed] = useState(false);
  const [toeSettingsConfirmed, setToeSettingsConfirmed] = useState(false);
  const defaultMenu = midiConfig.output ? "presets" : "midi";
  const [menu, setMenu] = useState(defaultMenu);

  useEffect(() => {
    if (menu != "edit-preset") {
      setToeSettingsConfirmed(false);
      setHeelSettingsConfirmed(false);
    } else {
      setToeSettingsConfirmed(true);
      setHeelSettingsConfirmed(true);
    }
  }, [menu]);

  const {
    midiObject,
    sysexByte,
    state,
    expressionVal,
    setExpressionVal,
    dispatch,
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

  const { deleteFactoryPreset, updateFactoryPresets } = useContext(
    FactoryPresetsContext
  );

  const presetTempoDispatch = (dispatchOverride) => {
    setPresetTempoVal(dispatchOverride.value);
    return dispatch;
  };

  const setPreset = (preset) => {
    if (midiObject && midiData.output && midiData.channel) {
      let { manufacturer, data } = parseSysexToBinary(preset.message);
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiData.output;
      })[0];
      deviceOutput.sendSysex(manufacturer, data);
      sysexKnobsUpdate({
        data: data.slice(5, 22),
        dispatch: dispatch,
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
            onClick={() => {
              setMenu("new-preset");
            }}
          >
            CREATE A NEW PRESET
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
                      <a onClick={() => setPreset(preset)}>{preset.label}</a>
                      <span className="pull-right">
                        {skipOgPresets(i) && (
                          <>
                            <a onClick={() => editPreset(preset, i)}>EDIT</a> |{" "}
                          </>
                        )}
                        <a onClick={() => clonePreset(preset)}>CLONE</a>
                        {skipOgPresets(i) && <> | </>}
                        {skipOgPresets(i) && (
                          <>
                            <a onClick={() => deletePreset(preset)}>DELETE</a>
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
              toeSettingsConfirmed={toeSettingsConfirmed}
              setToeSettingsConfirmed={setToeSettingsConfirmed}
              heelSettingsConfirmed={heelSettingsConfirmed}
              setHeelSettingsConfirmed={setHeelSettingsConfirmed}
              selectedPedal={selectedPedal}
              midiObject={midiObject}
              midiData={midiData}
              setMenu={setMenu}
              presetTempo={presetTempo}
              expressionVal={presetExpressionVal}
            />
          )}
          {menu == "edit-preset" && (
            <PresetsEditor
              heelSettingsConfirmed={heelSettingsConfirmed}
              setHeelSettingsConfirmed={setHeelSettingsConfirmed}
              toeSettingsConfirmed={toeSettingsConfirmed}
              setToeSettingsConfirmed={setToeSettingsConfirmed}
              selectedPedal={selectedPedal}
              midiObject={midiObject}
              midiData={midiData}
              setMenu={setMenu}
              presetTempo={presetTempo}
              presetToEdit={presetToEdit}
              presetToEditIndex={presetToEditIndex}
              expressionVal={presetExpressionVal}
              setExpressionVal={setPresetExpressionVal}
            />
          )}
        </div>
      </div>
      <div className="menu-select right pedals">
        {(menu == "new-preset" || menu == "edit-preset") && (
          <Expression
            showExpression={heelSettingsConfirmed && toeSettingsConfirmed}
            expressionVal={presetExpressionVal}
            presetTempo={presetTempo}
            setExpressionVal={setPresetExpressionVal}
            midiData={midiData}
            midiObject={midiObject}
            tempo={presetTempo}
            dispatch={presetTempoDispatch}
            selectedPedal={selectedPedal}
            invert={true}
          />
        )}
        {menu == "presets" && (
          <Expression
            showExpression={true}
            expressionVal={expressionVal}
            setExpressionVal={setExpressionVal}
            midiData={midiData}
            midiObject={midiObject}
            tempo={state[15]}
            dispatch={dispatch}
            selectedPedal={selectedPedal}
            invert={true}
          />
        )}
      </div>
    </div>
  );
}
