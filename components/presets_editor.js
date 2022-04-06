import PedalLayouts from "./pedal_layouts";
import pedalStates from "../data/pedal_states";
import merisStateReducer from "../hooks/meris_state";
import trackToggles from "../hooks/track_toggles";
import { MidiConfigContext } from "../hooks/midi_config";
import { FactoryPresetsContext } from "../hooks/presets_state";
import computeSysex from "../utilities/compute_sysex";
import applyExpression from "../hooks/apply_expression";
import { useContext, useState, useEffect } from "react";

export default function PresetsEditor(props) {
  const { updateFactoryPresets } = useContext(FactoryPresetsContext);
  let [heelSettingsConfirmed, setHeelSettingsConfirmed] = useState(true);
  let [toeSettingsConfirmed, setToeSettingsConfirmed] = useState(true);
  let [presetNumber, setPresetNumber] = useState(1);

  let {
    setMenu,
    selectedPedal,
    midiObject,
    midiData,
    expressionVal,
    setExpressionVal,
    presetToEdit,
  } = props;
  console.log(presetToEdit);
  let [presetName, setPresetName] = useState(presetToEdit.label);

  // DO SOMETHING HERE
  // TO Deconstruct the message

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

  let savePreset = () => {
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
        presetToEdit,
        finalDispatch
      );
    }
  }, [expressionVal]);

  return (
    <div className="fade-in">
      Create a new preset
      <div
        style={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!heelSettingsConfirmed && (
          <div className="fade-in">
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={heelState}
              dispatch={heelDispatch}
              midiObject={midiObject}
              midiData={midiData}
            />
            <a
              style={{ color: "white" }}
              onClick={() => {
                return setHeelSettingsConfirmed(true);
              }}
            >
              Confirm Heel Settings
            </a>
          </div>
        )}
        {heelSettingsConfirmed && !toeSettingsConfirmed && (
          <div className="fade-in">
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={toeState}
              dispatch={toeDispatch}
              midiObject={midiObject}
              midiData={midiData}
            />
            <a
              style={{ color: "white" }}
              onClick={() => {
                return setHeelSettingsConfirmed(false);
              }}
            >
              Change Heel Settings
            </a>
            <span style={{ color: "white" }}> | </span>
            <a
              style={{ color: "white" }}
              onClick={() => {
                return copyHeelSettings();
              }}
            >
              Copy Heel Settings
            </a>
            <span style={{ color: "white" }}> | </span>
            <a
              style={{ color: "white" }}
              onClick={() => {
                return setToeSettingsConfirmed(true);
              }}
            >
              Confirm Toe Settings
            </a>
          </div>
        )}
        {heelSettingsConfirmed && toeSettingsConfirmed && (
          <div className="fade-in">
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
            <a
              style={{ color: "white" }}
              onClick={() => {
                return setHeelSettingsConfirmed(false);
              }}
            >
              Change Heel Settings
            </a>
            <span style={{ color: "white" }}> | </span>
            <a
              style={{ color: "white" }}
              onClick={() => {
                return setToeSettingsConfirmed(false);
              }}
            >
              Change Toe Settings
            </a>
            <span style={{ color: "white" }}> | </span>
            <a
              style={{ color: "white" }}
              onClick={() => {
                return savePreset();
              }}
            >
              Update Preset
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
