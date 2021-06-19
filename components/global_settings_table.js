import {useState} from 'react'
import GlobalSettingsRow from "./global_settings_row"

export default function GlobalSettingsTable(props){
  const [inputMode, setInputMode] = useState(null);
  const [level, setLevel] = useState(null);
  const [bypassMode, setBypassMode] = useState(null);
  const [killDry, setKillDry] = useState(null);
  const [trails, setTrails] = useState(null);
  const [globalTempo, setGlobalTempo] = useState(null);
	
  let selected = (stateVal, thisVal)=>{
    return stateVal == thisVal ? 'selected' : '';
  }

  return(
		<div className="settings-container">
      <table>
        <tbody>
          <GlobalSettingsRow
            title="INPUT MODE"
            state={inputMode}
            setState={setInputMode}
            option1="Stereo"
            option2="Mono"
          />
          <GlobalSettingsRow
            title="LINE/SYNTH LEVEL"
            state={level}
            setState={setLevel}
            option1="Line"
            option2="Instrument"
          />
          <GlobalSettingsRow
            title="BYPASS MODE"
            state={bypassMode}
            setState={setBypassMode}
            option1="Relay"
            option2="Buffered"
          />
          <GlobalSettingsRow
            title="KILL DRY"
            state={killDry}
            setState={setKillDry}
            option1="Muted"
            option2="Active"
          />
          <GlobalSettingsRow
            title="TRAILS"
            state={trails}
            setState={setTrails}
            option1="On"
            option2="Off"
          />
          <GlobalSettingsRow
            title="GLOBAL TEMPO"
            state={globalTempo}
            setState={setGlobalTempo}
            option1="Preset"
            option2="Global"
          />
        </tbody>
      </table>
    </div>
	)
}