import PedalLayouts from "./pedal_layouts";
import merisStateReducer from "../hooks/meris_state";
import trackTogglesSimple from "../hooks/track_toggles_simple";
import { FactoryPresetsContext } from "../hooks/presets_state";
import computeSysex from "../utilities/compute_sysex";
import decomposeSysex from "../utilities/decompose_sysex";
import applyExpression from "../hooks/apply_expression";
import { useContext, useState, useEffect } from "react";

export default function PresetsEditor(props) {
  const { replaceFactoryPresets } = useContext(FactoryPresetsContext);

  let {
    setMenu,
    selectedPedal,
    midiObject,
    midiData,
    sysexByte,
    expressionVal,
    presetTempo,
    setPresetTempoVal,
    presetToEdit,
    presetToEditIndex,
    state,
    dispatch,
  } = props;

  let { heelStateInitial, toeStateInitial, presetNumberFromPreset, label } =
    decomposeSysex(presetToEdit, selectedPedal);
  let [presetName, setPresetName] = useState(label);
  let [presetNumber, setPresetNumber] = useState(presetNumberFromPreset);

  const [heelState, heelDispatch] = merisStateReducer(heelStateInitial, {
    midiData: midiData,
    midiObject: midiObject,
  });

  const [toeState, toeDispatch] = merisStateReducer(toeStateInitial, {
    midiData: midiData,
    midiObject: midiObject,
  });

  let finalDispatch = trackTogglesSimple({
    heelDispatch: heelDispatch,
    toeDispatch: toeDispatch,
    expressionVal: expressionVal,
    dispatch: dispatch,
  });

  let [computedPreset, setComputedPreset] = useState({
    label: presetName,
    message: computeSysex(heelState, toeState, sysexByte, presetNumber),
  });

  useEffect(() => {
    setComputedPreset({
      label: presetName,
      message: computeSysex(heelState, toeState, sysexByte, presetNumber),
    });
  }, [heelState, presetName, presetNumber, toeState]);

  useEffect(() => {
    setPresetTempoVal(state[15]);
  }, []);

  let updatePreset = () => {
    replaceFactoryPresets(selectedPedal, presetToEditIndex, computedPreset);
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
      <div className="preset-edit-container">
        <label>Edit preset</label>
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
              return updatePreset();
            }}
          >
            Update Preset
          </a>
        </div>
      </div>
    </div>
  );
}
