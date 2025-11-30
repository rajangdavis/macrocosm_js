import { v4 as uuidv4 } from "uuid";
import PedalLayouts from "./pedal_layouts";
import PresetSave from "./preset_save";
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
    showPresetSave,
    setShowPresetSave,
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
    resetPresetFields();
  };

  let resetPresetFields = () => {
    setPresetName("New Preset");
    setPresetNumber(1);
  };

  useEffect(() => {
    resetPresetFields();
  }, [selectedPedal]);

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
    <div className="presets-pedal-layout final">
      <div className="preset-create-container">
        <div className="pedal-layouts">
          <PedalLayouts
            selectedPedal={selectedPedal}
            state={state}
            dispatch={finalDispatch}
            midiObject={midiObject}
            midiData={midiData}
          />
          <PresetSave
            showPresetSave={showPresetSave}
            setShowPresetSave={setShowPresetSave}
            selectedPedal={selectedPedal}
            setPresetName={setPresetName}
            presetName={presetName}
            setPresetNumber={setPresetNumber}
            presetNumber={presetNumber}
            createPreset={createPreset}
          />
        </div>
      </div>
    </div>
  );
}
