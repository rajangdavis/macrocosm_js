import ManageMidi from "../hooks/manage_midi";
import PedalInit from "../hooks/pedal_init";
import { SelectedPedalContext } from "../hooks/selected_pedal_state";
import turnOffAllPedals from "../utilities/turn_off_all_pedals";

import PedalSelector from "../components/pedal_selector";
import PedalLayouts from "../components/pedal_layouts";
import MacrosLayout from "../components/macros_layout";
import ModalOpenButton from "../components/modal_open_button";
import PresetsModal from "../components/presets_modal";
import PresetsModalMacros from "../components/presets_modal_macros";
import MacrosModal from "../components/macros_modal";
import MacrosModalEdit from "../components/macros_modal_edit";
import Expression from "../components/expression";
import { PageStateContext } from "../hooks/page_state";
import ExpressionMacros from "../components/expression_macros";
import { useState, useEffect, useContext } from "react";

export default function Index() {
  const [midiObject, midiConfig, isConnected] = ManageMidi();
  const { pageState, setPageState } = useContext(PageStateContext);
  const { selectedPedal, setSelectedPedal } = useContext(SelectedPedalContext);
  const [expressionVal, setExpressionVal] = useState(0);
  const [presetsOpen, setPresetsOpen] = useState(false);
  const isSupported = midiObject && midiObject.supported;
  const canView = isConnected && isSupported;

  // State for macros
  const [selectedMacro, setSelectedMacro] = useState({});
  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [macrosModalEditOpen, setMacrosModalEditOpen] = useState(false);
  const [macroTempo, setMacroTempo] = useState(0);
  const [macroToEdit, setMacroToEdit] = useState(null);

  // State for pedals
  const [sysexByte, setSysexByte] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState({
    label: null,
    message: null,
  });

  let [selectedPedalState, selectedPedalDispatch, midiData] = PedalInit(
    midiObject,
    expressionVal,
    selectedPreset,
    setSelectedMacro
  );

  // State for both pages
  useEffect(() => {
    setExpressionVal(0);
    setMacroTempo(0);
  }, [selectedPreset, selectedMacro, pageState]);

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
          {pageState == "pedals" && canView && (
            <PedalSelector
              midiConfig={midiConfig}
              setSysexByte={setSysexByte}
              selectedPedal={selectedPedal}
              setSelectedPedal={setSelectedPedal}
              setSelectedPreset={setSelectedPreset}
            />
          )}
          {pageState == "macros" && canView && (
            <>
              <a
                className="add macro"
                onClick={() => {
                  turnOffAllPedals({
                    setSelectedMacro: setSelectedMacro,
                    midiConfig: midiConfig,
                    midiObject: midiObject,
                  });
                }}
              >
                <span className="macro-name">All Off</span>
              </a>
              <a
                className="add macro"
                onClick={() => {
                  setMacrosModalOpen(true);
                }}
              >
                <span className="macro-name">Add Macro</span>
              </a>
            </>
          )}
        </div>
        <div className="main-display">
          <ModalOpenButton
            pageState={pageState}
            setPageState={setPageState}
            presetsOpen={presetsOpen}
            setPresetsOpen={setPresetsOpen}
            isConnected={isConnected}
            isSupported={isSupported}
          />
          {!isConnected && isSupported && (
            <div className="not-connected">
              No MIDI output has been set in the Main Menu
            </div>
          )}

          {!isSupported && (
            <div className="not-connected">
              This browser has not accepted permission to connect to the WebMIDI
              API. Please provide permission to use this tool.
            </div>
          )}
          {pageState == "pedals" && canView && (
            <PedalLayouts
              selectedPedal={selectedPedal}
              state={selectedPedalState}
              dispatch={selectedPedalDispatch}
              midiObject={midiObject}
              midiData={midiData}
              setMacrosModalOpen={setMacrosModalOpen}
            />
          )}
          {pageState == "macros" && canView && (
            <MacrosLayout
              setSelectedMacro={setSelectedMacro}
              selectedMacro={selectedMacro}
              setMacroToEdit={setMacroToEdit}
              midiConfig={midiConfig}
              midiObject={midiObject}
              setMacrosModalEditOpen={setMacrosModalEditOpen}
            />
          )}
        </div>
        {pageState == "pedals" && canView && (
          <Expression
            expressionVal={expressionVal}
            setExpressionVal={setExpressionVal}
            selectedPedal={selectedPedal}
            selectedPedalState={selectedPedalState}
            dispatch={selectedPedalDispatch}
          />
        )}
        {pageState == "macros" && canView && (
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
      {presetsOpen && isSupported && pageState == "pedals" && (
        <PresetsModal
          selectedPedal={selectedPedal}
          midiData={midiData}
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
      {presetsOpen && isSupported && pageState == "macros" && (
        <PresetsModalMacros
          expressionVal={expressionVal}
          midiObject={midiObject}
          setMidiConfigModalOpen={setPresetsOpen}
        />
      )}
      {macrosModalOpen && isSupported && pageState == "macros" && (
        <MacrosModal
          midiObject={midiObject}
          setMacrosModalOpen={setMacrosModalOpen}
        />
      )}
      {macrosModalEditOpen && isSupported && pageState == "macros" && (
        <MacrosModalEdit
          midiObject={midiObject}
          macroToEdit={macroToEdit}
          setMacroToEdit={setMacroToEdit}
          setMacrosModalOpen={setMacrosModalEditOpen}
        />
      )}
    </div>
  );
}
