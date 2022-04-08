import CloseButton from "./close_button";
import NavMenu from "./nav_menu";
import { useContext } from "react";
import { MidiConfigContext } from "../hooks/midi_config";
import { PedalStatesContext } from "../hooks/pedal_states";

export default function PresetsModal(props) {
  const { midiConfig } = useContext(MidiConfigContext);
  const { pedalStates } = useContext(PedalStatesContext);
  const { midiObject, setMidiConfigModalOpen } = props;

  return (
    <div className="midi-config-modal zoom-in">
      <div className="menu-select">
        <CloseButton setHeaderOpen={setMidiConfigModalOpen} headerOpen={true} />
        <a>MIDI AND CONTROLS</a>
      </div>
      <div className="midi-config-modal-background"></div>
      <div className="midi-config-modal-content">
        <div>
          <NavMenu midiObject={midiObject} />
        </div>
      </div>
    </div>
  );
}
