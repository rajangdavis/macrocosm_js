import CloseButton from "./close_button";
import NavMenu from "./nav_menu";
import GlobalSettingsTable from "./global_settings_table";
import merisStateReducer from "../hooks/meris_state";
import { useContext, useState, useEffect } from "react";
import { MidiConfigContext } from "../hooks/midi_config";
import { PedalStatesContext } from "../hooks/pedal_states";
import useLocalStorage from "../hooks/use_local_storage";
import sysexKnobsUpdate from "../hooks/sysex_knobs_update";
import parseSysexToBinary from "../utilities/parse_sysex";

export default function PresetsModal(props) {
  const { midiConfig } = useContext(MidiConfigContext);
  const { pedalStates } = useContext(PedalStatesContext);
  const defaultMenu = midiConfig.output ? "presets" : "midi";
  const [menu, setMenu] = useState(defaultMenu);

  const { midiObject, setMidiConfigModalOpen } = props;

  return (
    <div className="presets-modal zoom-in">
      <div className="menu-select">
        <CloseButton setHeaderOpen={setMidiConfigModalOpen} headerOpen={true} />
        <a>MIDI AND CONTROLS</a>
      </div>
      <div className="presets-modal-background"></div>
      <div className="presets-modal-content">
        <div>
          <NavMenu midiObject={midiObject} />
        </div>
      </div>
    </div>
  );
}
