import PedalLayouts from "./pedal_layouts";
import pedalStates from "../data/pedal_states";
import merisStateReducer from "../hooks/meris_state";
// import trackToggles from "../hooks/track_toggles";
import { FactoryPresetsContext } from "../hooks/presets_state";
import computeSysex from "../utilities/compute_sysex";
import applyExpression from "../hooks/apply_expression";
import { useContext, useState, useEffect } from "react";

export default function PresetsBuilder(props) {
  const { updateFactoryPresets } = useContext(FactoryPresetsContext);
  let [heelSettingsConfirmed, setHeelSettingsConfirmed] = useState(false);
  let [toeSettingsConfirmed, setToeSettingsConfirmed] = useState(false);
  // move the settings confirmation to the modal
  // only show the expression settings
  // after both are confirmed

  let [presetNumber, setPresetNumber] = useState(1);
  let [presetName, setPresetName] = useState("New Preset");

  let { setMenu, selectedPedal, midiObject, midiData, expressionVal } = props;

  let initialState = { ...pedalStates[selectedPedal] };
  initialState[9] = 0; // 2-Way Toggle
  initialState[14] = 127; // On/Off
  initialState[15] = 0; // Tempo
  initialState[23] = 0;
  initialState[29] = 0; // 4-Way Toggle
  initialState[30] = 127; // 2-Way Toggle
  initialState[31] = 0; // 2-Way Toggle

  const [heelState, heelDispatch] = merisStateReducer(initialState, {
    midiData: midiData,
    midiObject: midiObject,
  });

  const [toeState, toeDispatch] = merisStateReducer(initialState, {
    midiData: midiData,
    midiObject: midiObject,
  });

  const [finalState, finalDispatch] = merisStateReducer(heelState, {
    midiData: midiData,
    midiObject: midiObject,
  });

  let copyHeelSettings = () => {
    let keys = Object.keys(heelState);
    for (var i = keys.length - 1; i >= 0; i--) {
      let key = keys[i];
      let value = heelState[keys[i]];
      toeDispatch({ skipMidi: true, key: key, value: value });
    }
    return null;
  };

  let computedPreset = () => {
    return {
      label: presetName,
      message: computeSysex(
        heelState,
        toeState,
        midiData.sysexByte,
        presetNumber
      ),
    };
  };

  let createPreset = () => {
    let presetTemplate = computedPreset();
    updateFactoryPresets(selectedPedal, presetTemplate);
    setMenu("presets");
  };

  useEffect(() => {
    if (heelSettingsConfirmed && toeSettingsConfirmed) {
      let presetTemplate = computedPreset();
      applyExpression(
        midiObject,
        midiData,
        expressionVal,
        presetTemplate,
        finalDispatch
      );
    }
  }, [expressionVal]);

  return (
    <div className="fade-in presets-pedal-layout">
      <label>Create a new preset</label>
      <div className="preset-create-container">
        {!heelSettingsConfirmed && (
          <div className="fade-in pedal-layouts">
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={heelState}
              dispatch={heelDispatch}
              midiObject={midiObject}
              midiData={midiData}
            />
            <a
              onClick={() => {
                return setHeelSettingsConfirmed(true);
              }}
            >
              Confirm Heel Settings
            </a>
            <span className="arrow right"></span>
          </div>
        )}
        {heelSettingsConfirmed && !toeSettingsConfirmed && (
          <div className="fade-in pedal-layouts">
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={toeState}
              dispatch={toeDispatch}
              midiObject={midiObject}
              midiData={midiData}
            />
            <span className="arrow left"></span>
            <a
              onClick={() => {
                return setHeelSettingsConfirmed(false);
              }}
            >
              Change Heel Settings
            </a>
            <span> | </span>
            <a
              onClick={() => {
                return copyHeelSettings();
              }}
            >
              Copy Heel Settings
            </a>
            <span> | </span>
            <a
              onClick={() => {
                return setToeSettingsConfirmed(true);
              }}
            >
              Confirm Toe Settings
            </a>
            <span className="arrow right"></span>
          </div>
        )}
        {heelSettingsConfirmed && toeSettingsConfirmed && (
          <div className="fade-in pedal-layouts">
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={finalState}
              dispatch={finalDispatch}
              midiObject={midiObject}
              midiData={midiData}
            />
            <input
              type="text"
              value={presetName}
              onChange={(e) => {
                setPresetName(e.target.value);
              }}
            />
            <input
              type="number"
              min="1"
              max="16"
              value={presetNumber}
              onChange={(e) => {
                setPresetNumber(e.target.value);
              }}
            />
            <br/>
            <span className="arrow left"></span>
            <a
              onClick={() => {
                return setHeelSettingsConfirmed(false);
              }}
            >
              Change Heel Settings
            </a>
            <span> | </span>
            <a
              onClick={() => {
                return setToeSettingsConfirmed(false);
              }}
            >
              Change Toe Settings
            </a>
            <span> | </span>
            <a
              onClick={() => {
                return createPreset();
              }}
            >
              Save Preset
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
