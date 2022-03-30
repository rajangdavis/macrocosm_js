import PresetsPedalLayout from "./presets_pedal_layout";
import pedalStates from "../data/pedal_states";
import merisStateReducer from "../hooks/meris_state";
import { MidiConfigContext } from "../hooks/midi_config";
import { FactoryPresetsContext } from "../hooks/presets_state";
import computeSysex from "../utilities/compute_sysex";
import { useContext, useState, useEffect } from "react";

export default function PresetsBuilder(props) {
  const { midiConfig } = useContext(MidiConfigContext);
  const { updateFactoryPresets } = useContext(FactoryPresetsContext);
  let [heelSettingsConfirmed, setHeelSettingsConfirmed] = useState(false);
  let [toeSettingsConfirmed, setToeSettingsConfirmed] = useState(false);
  let [presetExpressionVal, setPresetExpressionVal] = useState(0);
  let [presetNumber, setPresetNumber] = useState(1);
  let [presetName, setPresetName] = useState("New Preset");

  let { setMenu, selectedPedal, midiObject, midiData } = props;

  let initialState = { ...pedalStates[selectedPedal] };
  // default is ON
  initialState[14] = 127;

  const [heelState, heelDispatch] = merisStateReducer(initialState, {
    midiData: midiData,
    midiObject: midiObject,
  });

  const [toeState, toeDispatch] = merisStateReducer(initialState, {
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

  let createPreset = () => {
    let presetTemplate = {
      label: presetName,
      message: computeSysex(
        heelState,
        toeState,
        midiData.sysexByte,
        presetNumber
      ),
    };
    updateFactoryPresets(selectedPedal, presetTemplate);
    setMenu("presets");
  };

  // Insert code to keep track of

  // CC14 -> On Off => always on
  // CC9  -> Toggle
  // CC29 -> Toggle
  // CC30 -> Toggle
  // CC15 -> Tempo

  // // useEffect(()=>{

  // // }, [heelState, heelDispatch, toeState, toeDispatch])

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
            <PresetsPedalLayout
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
            <PresetsPedalLayout
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
            <PresetsPedalLayout
              selectedPedal={selectedPedal}
              state={toeState}
              dispatch={toeDispatch}
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
