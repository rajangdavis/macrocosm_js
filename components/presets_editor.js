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
  let [heelSettingsConfirmed, setHeelSettingsConfirmed] = useState(true);
  let [toeSettingsConfirmed, setToeSettingsConfirmed] = useState(true);

  let {
    setMenu,
    selectedPedal,
    midiObject,
    midiData,
    expressionVal,
    presetToEdit,
    presetToEditIndex,
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

  let copyHeelSettings = (heelState, dispatch) => {
    let keys = Object.keys(heelState);
    for (var i = keys.length - 1; i >= 0; i--) {
      let key = keys[i];
      let value = heelState[keys[i]];
      dispatch({ skipMidi: true, key: key, value: value });
    }
    return null;
  };

  let computedPreset = (heelStateNow, toeStateNow) => {
    return {
      label: presetName,
      message: computeSysex(
        heelStateNow,
        toeStateNow,
        midiData.sysexByte,
        presetNumber
      ),
    };
  };

  useEffect(() => {
    if (heelSettingsConfirmed && toeSettingsConfirmed) {
      applyExpression(
        midiObject,
        midiData,
        expressionVal,
        computedPreset(heelState, toeState),
        finalDispatch
      );
      console.log("CALLING EXPRESSION");
    }
  }, [expressionVal]);

  useEffect(() => {
    console.log("CALLING COPY OF HEELSTATE");
    copyHeelSettings(heelState, finalDispatch);
  }, [heelState]);

  let updatePreset = () => {
    let presetTemplate = computedPreset(heelState, toeState);
    replaceFactoryPresets(selectedPedal, presetToEditIndex, presetTemplate);
    setMenu("presets");
  };

  return (
    <div className="fade-in">
      Edit preset
      <div className="preset-edit-container">
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
