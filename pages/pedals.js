import PedalLayouts from "../components/pedal_layouts";
import PedalSelector from "../components/pedal_selector";
import ModalOpenButton from "../components/modal_open_button";
import PresetsModal from "../components/presets_modal";
import useLocalStorage from "../hooks/use_local_storage";
import PedalInit from "../hooks/pedal_init";
import { MidiConfigContext } from "../hooks/midi_config";
import Expression from "../components/expression";
import { useState, useContext, useEffect } from "react";

export default function Pedals(props) {
  let { midiObject } = props;
  const [selectedPedal, setSelectedPedal] = useLocalStorage(
    "selected_pedal",
    "enzo"
  );
  const [expressionVal, setExpressionVal] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState({
    label: null,
    message: null,
  });

  const [sysexByte, setSysexByte] = useState(0);

  const { midiConfig } = useContext(MidiConfigContext);

  let [selectedPedalState, selectedPedalDispatch] = PedalInit(
    midiObject,
    expressionVal,
    selectedPreset,
    selectedPedal
  );

  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`],
    output: midiConfig.output,
    inputForExpression: midiConfig.inputForExpression,
  };

  useEffect(() => {
    setExpressionVal(0);
  }, [selectedPreset]);

  const [presetsOpen, setPresetsOpen] = useState(false);

  return (
    <div className="container fade-in">
      <div className="view-port">
        <div className="pedal-selector">
          <PedalSelector
            midiConfig={midiConfig}
            setSysexByte={setSysexByte}
            selectedPedal={selectedPedal}
            setSelectedPedal={setSelectedPedal}
            setExpressionVal={setExpressionVal}
            setSelectedPreset={setSelectedPreset}
          />
        </div>
        <div className="main-display">
          <ModalOpenButton
            presetsOpen={presetsOpen}
            setPresetsOpen={setPresetsOpen}
          />
          <PedalLayouts
            selectedPedal={selectedPedal}
            state={selectedPedalState}
            dispatch={selectedPedalDispatch}
            midiObject={midiObject}
            midiData={midiData}
          />
        </div>
        <Expression
          expressionVal={expressionVal}
          setExpressionVal={setExpressionVal}
          midiData={midiData}
          midiObject={midiObject}
          tempo={selectedPedalState[15]}
          dispatch={selectedPedalDispatch}
        />
      </div>
      {presetsOpen && (
        <PresetsModal
          selectedPedal={selectedPedal}
          state={selectedPedalState}
          dispatch={selectedPedalDispatch}
          expressionVal={expressionVal}
          sysexByte={sysexByte}
          midiObject={midiObject}
          setPresetsOpen={setPresetsOpen}
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
        />
      )}
    </div>
  );
}
