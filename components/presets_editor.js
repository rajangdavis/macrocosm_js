import PedalLayouts from "./pedal_layouts";
import merisStateReducer from "../hooks/meris_state";
// import trackToggles from "../hooks/track_toggles";
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
    expressionVal,
    presetTempo,
    setPresetTempoVal,
    presetToEdit,
    presetToEditIndex,
    heelSettingsConfirmed,
    setHeelSettingsConfirmed,
    toeSettingsConfirmed,
    setToeSettingsConfirmed,
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

  const [finalState, finalDispatch] = merisStateReducer(heelStateInitial, {
    midiData: midiData,
    midiObject: midiObject,
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

  let copyHeelSettings = (heelState, dispatch) => {
    let keys = Object.keys(heelState);
    for (var i = keys.length - 1; i >= 0; i--) {
      let key = keys[i];
      let value = heelState[keys[i]];
      dispatch({ skipMidi: true, key: key, value: value });
    }
    return null;
  };

  useEffect(() => {
    setPresetTempoVal(finalState[15]);
  }, []);

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

  let updatePreset = () => {
    replaceFactoryPresets(selectedPedal, presetToEditIndex, computedPreset);
    setMenu("presets");
  };

  let presetsClassWhenFinal = () => {
    if (heelSettingsConfirmed && toeSettingsConfirmed) {
      return "fade-in presets-pedal-layout final";
    } else {
      return "fade-in presets-pedal-layout";
    }
  };

  return (
    <div className={presetsClassWhenFinal()}>
      <div className="preset-edit-container">
        <label>Edit preset</label>
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
                return updatePreset();
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
