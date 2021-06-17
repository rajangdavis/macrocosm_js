import NavButton from './nav_button'
import GlobalSettingsTable from './global_settings_table'
import {useContext} from 'react'
import {MidiConfigContext} from '../hooks/midi_config'
import sysexKnobsUpdate from '../hooks/sysex_knobs_update'
import parseSysexToBinary from '../utilities/parse_sysex'

export default function PresetsModal(props){
  const {midiConfig} = useContext(MidiConfigContext)
  const midiData = {channel: midiConfig.enzoChannel, output: midiConfig.output}

  const setPreset = (preset)=>{
    let {midiObject, setSelectedPreset} = props;
    if(midiObject && midiData.output && midiData.channel){
      let {manufacturer, data} = parseSysexToBinary(preset.message)
      let deviceOutput = midiObject.outputs.filter(x =>{
        return x.name == midiData.output
      })[0]
      deviceOutput.sendSysex(manufacturer, data)
      setSelectedPreset(preset.label)
      sysexKnobsUpdate({data: data, enzoDispatch: props.enzoDispatch})
    }
  }

  const selectedClassName = (preset)=>{
    if(preset.label == props.selectedPreset){
      return 'selected preset-row';
    }else{
      return 'preset-row';
    }
  }

  return (
		<div className="presets-modal zoom-in">
      <div className="presets-modal-background">
			<NavButton 
				headerOpen={true} 
				setHeaderOpen={props.setPresetsOpen}
				/>
      </div>
      <div className="presets-modal-content">
        <label>GLOBAL SETTINGS</label>
        <hr/>
        <div className="global-settings">
          <GlobalSettingsTable />
        </div>
        <label>PRESETS</label>
        <hr/>
        <div className="presets-container">
          {props.presets.map((preset, i) =>{
            return <div key={i} onClick={()=> setPreset(preset)} className={selectedClassName(preset)}>{preset.label}</div>
        	})}
        </div>
      </div>
    </div>
  )
}
