import ExpressionMacros from "../components/expression_macros";
import ModalOpenButtonMacros from "../components/modal_open_button_macros";
import PresetsModalMacros from "../components/presets_modal_macros";
import useLocalStorage from "../hooks/use_local_storage";
import ManageMacroState from "../hooks/macro_state";
import { MidiConfigContext } from "../hooks/midi_config";
import { HandleMidiOutput } from "../hooks/midi_io";
import MacrosModal from "../components/macros_modal";
import MacrosModalEdit from "../components/macros_modal_edit";
import { useEffect, useContext, useState } from "react";
import parseSysexToBinary from "../utilities/parse_sysex";

export default function Macros(props) {
  const { midiConfig } = useContext(MidiConfigContext);
  const { midiObject } = props;
  const [expressionVal, setExpressionVal] = useState(0);
  const [selectedMacro, setSelectedMacro] = useState({});
  const [midiConfigModalOpen, setMidiConfigModalOpen] = useState(false);
  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [macrosModalEditOpen, setMacrosModalEditOpen] = useState(false);
  const [macroToEdit, setMacroToEdit] = useState(null);
  let [initialState, setState] = useLocalStorage("macro_state", []);
  let [macros, macroDispatch] = ManageMacroState(initialState);
  useEffect(() => {
    setState(macros);
  });

  const callMacro = async (macro) => {
    setSelectedMacro(macro);
    let macroData = macro.data;
    let macroSelectedPedals = macroData.pedals.filter(
      (x) => x.showing == true && x.selectedPreset != {}
    );
    let notSelectedPedals = macroData.pedals.filter((x) => x.showing == false);

    let macroMessageData = macroSelectedPedals.map((x) => {
      let message = parseSysexToBinary(x.selectedPreset.message);
      return {
        name: x.name,
        channel: midiConfig[`${x.name}Channel`],
        message: message,
      };
    });

    let turnOffThesePedals = notSelectedPedals.map((x) => {
      return { name: x.name, channel: midiConfig[`${x.name}Channel`] };
    });

    let deviceOutput = midiObject.outputs.filter((x) => {
      return x.name == midiConfig.output;
    })[0];

    if (deviceOutput) {
      const results = await Promise.all(
        turnOffThesePedals
          .map((x) => {
            console.log("TURNING OFF PEDAL: " + x.name);
            return deviceOutput.sendControlChange(14, 0, {
              channels: parseInt(x.channel),
            });
          })
          .concat(
            macroMessageData.map((x) => {
              console.log("TURNING ON PRESET: " + x.name);
              return [
                deviceOutput.sendControlChange(14, 127, {
                  channels: parseInt(x.channel),
                }),
                deviceOutput.sendSysex(x.message.manufacturer, x.message.data),
              ];
            })
          )
      );
      console.log(results);
    }
  };

  return (
    <div className="container fade-in">
      <div className="view-port">
        <div className="pedal-selector">
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
        </div>
        <div className="main-display macros">
          <ModalOpenButtonMacros
            midiConfigModalOpen={midiConfigModalOpen}
            setMidiConfigModalOpen={setMidiConfigModalOpen}
          />
          <div className="macro-display">
            {macros.map((macro, i) => {
              return (
                <div
                  className="macro"
                  key={i}
                  onClick={() => {
                    callMacro(macro);
                  }}
                >
                  {macro.data.name}
                  <a
                    href="#"
                    onClick={() => {
                      macroDispatch({
                        type: "remove-macro",
                        macro_id: macro.macro_id,
                      });
                    }}
                  >
                    remove
                  </a>
                  |
                  <a
                    href="#"
                    onClick={() => {
                      macroDispatch({
                        type: "clone-macro",
                        macro_id: macro.macro_id,
                      });
                    }}
                  >
                    clone
                  </a>
                  |
                  <a
                    href="#"
                    onClick={() => {
                      setMacroToEdit(macro);
                      setMacrosModalEditOpen(true);
                    }}
                  >
                    edit
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <ExpressionMacros
          expressionVal={expressionVal}
          setExpressionVal={setExpressionVal}
          selectedMacro={selectedMacro}
          midiObject={midiObject}
          midiConfig={midiConfig}
        />
      </div>
      {macrosModalOpen && (
        <MacrosModal
          macroDispatch={macroDispatch}
          setMacrosModalOpen={setMacrosModalOpen}
        />
      )}
      {macrosModalEditOpen && (
        <MacrosModalEdit
          macroDispatch={macroDispatch}
          macroToEdit={macroToEdit}
          setMacroToEdit={setMacroToEdit}
          setMacrosModalOpen={setMacrosModalEditOpen}
        />
      )}
      {midiConfigModalOpen && (
        <PresetsModalMacros
          expressionVal={expressionVal}
          midiObject={midiObject}
          setMidiConfigModalOpen={setMidiConfigModalOpen}
        />
      )}
    </div>
  );
}
