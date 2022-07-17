import { v4 as uuidv4 } from "uuid";
import PedalLayouts from "./pedal_layouts";
import pedalStates from "../data/pedal_states";
import merisStateReducer from "../hooks/meris_state";
// import trackToggles from "../hooks/track_toggles";
import { FactoryPresetsContext } from "../hooks/presets_state";
import computeSysex from "../utilities/compute_sysex";
import applyExpression from "../hooks/apply_expression";
import { useContext, useState, useEffect } from "react";

export default function PresetsBuilder(props) {
  let { updateFactoryPresets } = useContext(FactoryPresetsContext);
  let [presetNumber, setPresetNumber] = useState(1);
  let [presetName, setPresetName] = useState("New Preset");

  let {
    setMenu,
    selectedPedal,
    midiObject,
    midiData,
    expressionVal,
    presetTempo,
    heelSettingsConfirmed,
    setHeelSettingsConfirmed,
    toeSettingsConfirmed,
    setToeSettingsConfirmed,
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

  let [finalState, finalDispatch] = merisStateReducer(heelState, {
    midiData: midiData,
    midiObject: midiObject,
    tag: "finalState",
  });

  let noOpDispatch = () => {
    return;
  };

  // Refactor to return new dispatches
  // That modify state

  // trackToggles({
  //   heelState: heelState,
  //   heelDispatch: heelDispatch,
  //   toeState: toeState,
  //   toeDispatch: toeDispatch,
  // });

  let [computedPreset, setComputedPreset] = useState({
    label: presetName,
    preset_id: uuidv4(),
    message: computeSysex(
      heelState,
      toeState,
      midiData.sysexByte,
      presetNumber
    ),
  });

  useEffect(() => {
    setComputedPreset({
      label: presetName,
      message: computeSysex(
        heelState,
        toeState,
        midiData.sysexByte,
        presetNumber
      ),
    });
  }, [heelState, heelSettingsConfirmed, presetName, presetNumber, toeState]);

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
    updateFactoryPresets(selectedPedal, computedPreset);
    setMenu("presets");
  };

  useEffect(() => {
    heelDispatch({ skipMidi: true, key: 15, value: presetTempo });
    toeDispatch({ skipMidi: true, key: 15, value: presetTempo });
    finalDispatch({ skipMidi: true, key: 15, value: presetTempo });
  }, [presetTempo]);

  useEffect(() => {
    applyExpression(
      midiObject,
      midiData,
      expressionVal,
      computedPreset,
      finalDispatch
    );
  }, [expressionVal, heelState, toeState]);

  let presetsClassWhenFinal = () => {
    if (heelSettingsConfirmed && toeSettingsConfirmed) {
      return "fade-in presets-pedal-layout final";
    } else {
      return "fade-in presets-pedal-layout";
    }
  };

  return (
    <div className={presetsClassWhenFinal()}>
      <div className="preset-create-container">
        <label>Create a preset</label>
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
                return copyHeelSettings(heelState, toeDispatch);
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
          </div>
        )}
        {heelSettingsConfirmed && toeSettingsConfirmed && (
          <div className="fade-in pedal-layouts">
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={finalState}
              dispatch={noOpDispatch}
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
