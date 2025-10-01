import { v4 as uuidv4 } from "uuid";
import PedalLayouts from "./pedal_layouts";
import merisStateReducer from "../hooks/meris_state";
import trackToggles from "../hooks/track_toggles";
import { FactoryPresetsContext } from "../hooks/presets_state";
import computeSysex from "../utilities/compute_sysex";
import applyExpression from "../hooks/apply_expression";
import { useContext, useState, useEffect } from "react";

export default function PresetsBuilder(props) {
  let { updateFactoryPresets } = useContext(FactoryPresetsContext);
  let [presetNumber, setPresetNumber] = useState(1);
  let [presetName, setPresetName] = useState("New Preset");

  let {
    selectedPedal,
    midiObject,
    midiData,
    sysexByte,
    expressionVal,
    dispatch,
    state,
  } = props;

  let [heelState, heelDispatch] = merisStateReducer(state, {
    midiData: midiData,
    midiObject: midiObject,
    tag: "heelState",
  });

  let [toeState, toeDispatch] = merisStateReducer(state, {
    midiData: midiData,
    midiObject: midiObject,
    tag: "toeState",
  });

  let finalDispatch = trackToggles({
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

  let createPreset = () => {
    updateFactoryPresets(selectedPedal, computedPreset);
  };

  useEffect(() => {
    applyExpression(
      midiObject,
      midiData,
      expressionVal,
      computedPreset,
      dispatch,
      state
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
