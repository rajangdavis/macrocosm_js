import { useState } from "react";
import GlobalSettingsRow from "./global_settings_row";

export default function GlobalSettingsTable(props) {
  const [inputMode, setInputMode] = useState(null);
  const [level, setLevel] = useState(null);
  const [bypassMode, setBypassMode] = useState(null);
  const [killDry, setKillDry] = useState(null);
  const [trails, setTrails] = useState(null);
  const [globalTempo, setGlobalTempo] = useState(null);

  return (
    <div className="settings-container">
      <table>
        <tbody>
          <GlobalSettingsRow
            midiObject={props.midiObject}
            sysexByte={props.sysexByte}
            title="INPUT MODE"
            state={inputMode}
            setState={setInputMode}
            settingNumber={0}
            option1="Stereo"
            option2="Mono"
          />
          <GlobalSettingsRow
            midiObject={props.midiObject}
            sysexByte={props.sysexByte}
            title="LINE/SYNTH LEVEL"
            state={level}
            setState={setLevel}
            settingNumber={1}
            option1="Line"
            option2="Instrument"
          />
          <GlobalSettingsRow
            midiObject={props.midiObject}
            sysexByte={props.sysexByte}
            title="BYPASS MODE"
            state={bypassMode}
            setState={setBypassMode}
            settingNumber={2}
            option1="Relay"
            option2="Buffered"
          />
          <GlobalSettingsRow
            midiObject={props.midiObject}
            sysexByte={props.sysexByte}
            title="KILL DRY"
            state={killDry}
            setState={setKillDry}
            settingNumber={3}
            option1="Muted"
            option2="Active"
          />
          <GlobalSettingsRow
            midiObject={props.midiObject}
            sysexByte={props.sysexByte}
            title="TRAILS"
            state={trails}
            setState={setTrails}
            settingNumber={4}
            option1="On"
            option2="Off"
          />
          <GlobalSettingsRow
            sysexByte={props.sysexByte}
            title="GLOBAL TEMPO"
            state={globalTempo}
            setState={setGlobalTempo}
            settingNumber={5}
            option1="Preset"
            option2="Global"
          />
        </tbody>
      </table>
    </div>
  );
}
