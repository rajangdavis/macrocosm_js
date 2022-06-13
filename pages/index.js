import ManageMidi from "../hooks/manage_midi";
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
import { useState, useEffect } from "react";

export default function Index() {
  const [midiObject, midiConfig, isConnected] = ManageMidi();
  let [pageState, setPageState] = useLocalStorage("page_state", "pedals");
  const [expressionVal, setExpressionVal] = useState(0);
  const [presetsOpen, setPresetsOpen] = useState(false);

  // State for macros
  const [selectedMacro, setSelectedMacro] = useState({});
  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [macrosModalEditOpen, setMacrosModalEditOpen] = useState(false);
  const [macroTempo, setMacroTempo] = useState(0);
  const [macroToEdit, setMacroToEdit] = useState(null);
  let [initialMacrosState, setMacroState] = useLocalStorage("macro_state", []);
  let [macros, macroDispatch] = ManageMacroState(initialMacrosState);
  useEffect(() => {
    setMacroState(macros);
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

  useEffect(() => {
    setSelectedMacro({});
    setSelectedPreset({
      label: null,
      message: null,
    });
  }, [pageState]);

  return (
    <div className="container fade-in">
      <div className="view-port">
        <div className="pedal-selector">
          {pageState == "pedals" && isConnected && (
            <PedalSelector
              midiConfig={midiConfig}
              setSysexByte={setSysexByte}
              selectedPedal={selectedPedal}
              setSelectedPedal={setSelectedPedal}
              setExpressionVal={setExpressionVal}
              setSelectedPreset={setSelectedPreset}
            />
          )}
          {pageState == "macros" && isConnected && (
            <a
              className="add macro"
              onClick={() => {
                setMacrosModalOpen(true);
              }}
            >
              <span className="macro-name">Add Macro</span>
            </a>
          )}
        </div>
        <div className="main-display">
          <ModalOpenButton
            pageState={pageState}
            setPageState={setPageState}
            presetsOpen={presetsOpen}
            setPresetsOpen={setPresetsOpen}
            isConnected={isConnected}
          />
          {!isConnected && (
            <div className="not-connected">
              No MIDI output has been set in the Main Menu
            </div>
          )}
          {pageState == "pedals" && isConnected && (
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={selectedPedalState}
              dispatch={selectedPedalDispatch}
              midiObject={midiObject}
              midiData={midiData}
              setMacrosModalOpen={setMacrosModalOpen}
            />
          )}
          {pageState == "macros" && isConnected && (
            <MacrosLayout
              setSelectedMacro={setSelectedMacro}
              selectedMacro={selectedMacro}
              macros={macros}
              macroDispatch={macroDispatch}
              setMacroToEdit={setMacroToEdit}
              midiConfig={midiConfig}
              midiObject={midiObject}
              setMacrosModalEditOpen={setMacrosModalEditOpen}
            />
          )}
        </div>
        {pageState == "pedals" && isConnected && (
          <Expression
            expressionVal={expressionVal}
            setExpressionVal={setExpressionVal}
            selectedPedal={selectedPedal}
            midiData={midiData}
            midiObject={midiObject}
            tempo={selectedPedalState[15]}
            dispatch={selectedPedalDispatch}
          />
        )}
        {pageState == "macros" && isConnected && (
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
          setExpressionVal={setExpressionVal}
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
