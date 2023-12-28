import { v4 as uuidv4 } from "uuid";
import PedalLayouts from "./pedal_layouts";
import pedalStates from "../data/pedal_states";
import merisStateReducer from "../hooks/meris_state";
import trackTogglesSimple from "../hooks/track_toggles_simple";
import { FactoryPresetsContext } from "../hooks/presets_state";
import computeSysex from "../utilities/compute_sysex";
import applyExpression from "../hooks/apply_expression";
import { useContext, useState, useEffect } from "react";

export default function PresetsBuilderSimple(props) {
  let { updateFactoryPresets } = useContext(FactoryPresetsContext);
  let [presetNumber, setPresetNumber] = useState(1);
  let [presetName, setPresetName] = useState("New Preset");

  let {
    setMenu,
    selectedPedal,
    midiObject,
    midiData,
    sysexByte,
    expressionVal,
    presetTempo,
    dispatch,
    state
  } = props;

  let initialState = { ...pedalStates[selectedPedal] };
  initialState[9] = 0; // 2-Way Toggle
  initialState[14] = 127; // On/Off
  initialState[15] = presetTempo; // Tempo
  initialState[23] = 0;
  initialState[29] = 0; // 4-Way Toggle
  initialState[30] = 127; // 2-Way Toggle
  initialState[31] = 0; // 2-Way Toggle

  let [heelState, heelDispatch] = merisStateReducer(initialState, {
    midiData: midiData,
    midiObject: midiObject,
    tag: "heelState",
  });

  let [toeState, toeDispatch] = merisStateReducer(initialState, {
    midiData: midiData,
    midiObject: midiObject,
    tag: "toeState",
  });

  let finalDispatch = trackTogglesSimple({
    heelDispatch: heelDispatch,
    toeDispatch: toeDispatch,
    expressionVal: expressionVal,
    dispatch: dispatch,
  });

  let [computedPreset, setComputedPreset] = useState({
    label: presetName,
    preset_id: uuidv4(),
    message: computeSysex(heelState, toeState, sysexByte, presetNumber),
  });

  useEffect(() => {
    setComputedPreset({
      label: presetName,
      preset_id: uuidv4(),
      message: computeSysex(heelState, toeState, sysexByte, presetNumber),
    });
  }, [heelState, presetName, presetNumber, toeState]);

  let copyHeelSettings = (heelState, dispatch) => {
    let keys = Object.keys(heelState);
    for (var i = keys.length - 1; i >= 0; i--) {
      let key = keys[i];
      let value = heelState[keys[i]];
      dispatch({ skipMidi: true, key: key, value: value });
    }
    return null;
  };

  let createPreset = () => {
    updateFactoryPresets(selectedPedal, computedPreset);
    setMenu("presets");
  };

  useEffect(() => {
    finalDispatch({ skipMidi: true, key: 15, value: presetTempo });
  }, [presetTempo]);

  useEffect(() => {
    applyExpression(
      midiObject,
      midiData,
      expressionVal,
      computedPreset,
      dispatch
    );
  }, [expressionVal, computedPreset]);

  return (
    <div className="fade-in presets-pedal-layout final">
      <div className="preset-create-container">
        <label>Create a preset</label>
          <div className="fade-in pedal-layouts">
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={state}
              dispatch={finalDispatch}
              midiObject={midiObject}
              midiData={midiData}
            />
            <div className="text-input">
              <span>Preset Name</span>
              <input
                type="text"
                value={presetName}
                onChange={(e) => {
                  setPresetName(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="preset-input">
              <label>Preset Number</label>
              <input
                type="number"
                min="1"
                max="16"
                value={parseInt(presetNumber)}
                onChange={(e) => {
                  setPresetNumber(e.target.value);
                }}
              />
            </div>
            <br />
            <a
              onClick={() => {
                return createPreset();
              }}
            >
              Save Preset
            </a>
          </div>
      </div>
    </div>
  );
}
