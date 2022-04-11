import { MidiConfigContext } from "../hooks/midi_config";
import PedalInit from "../hooks/pedal_init";
import useLocalStorage from "../hooks/use_local_storage";
import ManageMacroState from "../hooks/macro_state";
import PedalSelector from "../components/pedal_selector";
import PedalLayouts from "../components/pedal_layouts";
import MacrosLayout from "../components/macros_layout";
import ModalOpenButton from "../components/modal_open_button";
import PresetsModal from "../components/presets_modal";
import PresetsModalMacros from "../components/presets_modal_macros";
import MacrosModal from "../components/macros_modal";
import MacrosModalEdit from "../components/macros_modal_edit";
import Expression from "../components/expression";
import ExpressionMacros from "../components/expression_macros";
import { useState, useContext, useEffect } from "react";

export default function Index(props) {
  // State for both pages
  let { midiObject } = props;
  let { midiConfig } = useContext(MidiConfigContext);
  let [pageState, setPageState] = useLocalStorage("page_state", "pedals");
  const [expressionVal, setExpressionVal] = useState(0);
  const [presetsOpen, setPresetsOpen] = useState(false);

  // State for macros
  const [selectedMacro, setSelectedMacro] = useState({});
  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [macrosModalEditOpen, setMacrosModalEditOpen] = useState(false);
  const [macroTempo, setMacroTempo] = useState(0);
  const [macroToEdit, setMacroToEdit] = useState(null);
  let [initialMacrosState, setState] = useLocalStorage("macro_state", []);
  let [macros, macroDispatch] = ManageMacroState(initialMacrosState);
  useEffect(() => {
    setState(macros);
  });

  // State for pedals
  const [sysexByte, setSysexByte] = useState(0);
  const [selectedPedal, setSelectedPedal] = useLocalStorage(
    "selected_pedal",
    "enzo"
  );
  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`],
    output: midiConfig.output,
    inputForExpression: midiConfig.inputForExpression,
  };
  const [selectedPreset, setSelectedPreset] = useState({
    label: null,
    message: null,
  });
  let [selectedPedalState, selectedPedalDispatch] = PedalInit(
    midiObject,
    expressionVal,
    selectedPreset,
    selectedPedal
  );

  // State for both pages
  useEffect(() => {
    setExpressionVal(0);
    setMacroTempo(0);
  }, [selectedPreset, selectedMacro, selectedPreset, pageState]);

  return (
    <div className="container fade-in">
      <div className="view-port">
        <div className="pedal-selector">
          {pageState == "pedals" && (
            <PedalSelector
              midiConfig={midiConfig}
              setSysexByte={setSysexByte}
              selectedPedal={selectedPedal}
              setSelectedPedal={setSelectedPedal}
              setExpressionVal={setExpressionVal}
              setSelectedPreset={setSelectedPreset}
            />
          )}
          {pageState == "macros" && (
            <div
              className="add macro"
              onClick={() => {
                setMacrosModalOpen(true);
              }}
            >
              <div></div>
              <div></div>
              <span>Add Macro</span>
            </div>
          )}
        </div>
        <div className="main-display">
          <ModalOpenButton
            pageState={pageState}
            setPageState={setPageState}
            presetsOpen={presetsOpen}
            setPresetsOpen={setPresetsOpen}
          />
          {pageState == "pedals" && (
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={selectedPedalState}
              dispatch={selectedPedalDispatch}
              midiObject={midiObject}
              midiData={midiData}
              setMacrosModalOpen={setMacrosModalOpen}
            />
          )}
          {pageState == "macros" && (
            <MacrosLayout
              setSelectedMacro={setSelectedMacro}
              macros={macros}
              macroDispatch={macroDispatch}
              setMacroToEdit={setMacroToEdit}
              midiConfig={midiConfig}
              midiObject={midiObject}
              setMacrosModalEditOpen={setMacrosModalEditOpen}
            />
          )}
        </div>
        {pageState == "pedals" && (
          <Expression
            expressionVal={expressionVal}
            setExpressionVal={setExpressionVal}
            midiData={midiData}
            midiObject={midiObject}
            tempo={selectedPedalState[15]}
            dispatch={selectedPedalDispatch}
          />
        )}
        {pageState == "macros" && (
          <ExpressionMacros
            expressionVal={expressionVal}
            setExpressionVal={setExpressionVal}
            selectedMacro={selectedMacro}
            midiObject={midiObject}
            midiConfig={midiConfig}
            macroTempo={macroTempo}
            setMacroTempo={setMacroTempo}
          />
        )}
      </div>
      {presetsOpen && pageState == "pedals" && (
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
      {presetsOpen && pageState == "macros" && (
        <PresetsModalMacros
          expressionVal={expressionVal}
          midiObject={midiObject}
          setMidiConfigModalOpen={setPresetsOpen}
        />
      )}
      {macrosModalOpen && pageState == "macros" && (
        <MacrosModal
          macroDispatch={macroDispatch}
          setMacrosModalOpen={setMacrosModalOpen}
        />
      )}
      {macrosModalEditOpen && pageState == "macros" && (
        <MacrosModalEdit
          macroDispatch={macroDispatch}
          macroToEdit={macroToEdit}
          setMacroToEdit={setMacroToEdit}
          setMacrosModalOpen={setMacrosModalEditOpen}
        />
      )}
    </div>
  );
}
