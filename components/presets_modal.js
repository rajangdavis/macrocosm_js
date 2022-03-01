import CloseButton from './close_button'
import NavMenu from './nav_menu'
import GlobalSettingsTable from './global_settings_table'
import {useContext, useState, useEffect} from 'react'
import {MidiConfigContext} from '../hooks/midi_config'
import useLocalStorage from '../hooks/use_local_storage'
import sysexKnobsUpdate from '../hooks/sysex_knobs_update'
import parseSysexToBinary from '../utilities/parse_sysex'

export default function PresetsModal(props){
  const {midiConfig} = useContext(MidiConfigContext);
  const [selectedPedal, setSelectedPedal] = useLocalStorage('selected_pedal', 'enzo');
  const defaultMenu = midiConfig.output ? 'presets' : 'midi';
  const [menu, setMenu] = useState(defaultMenu);

  const {
    midiObject,
    sysexByte,
    // dispatch,
    presets,
    selectedPreset,
    setSelectedPreset,
    setPresetsOpen
  } = props
  
  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`], 
    output: midiConfig.output, 
    sysexByte: sysexByte
  }

  const setPreset = (preset)=>{
    if(midiObject && midiData.output && midiData.channel){
      let {manufacturer, data} = parseSysexToBinary(preset.message)
      let deviceOutput = midiObject.outputs.filter(x =>{
        return x.name == midiData.output
      })[0]
      deviceOutput.sendSysex(manufacturer, data)
      // sysexKnobsUpdate({data: data.slice(5,22), dispatch: dispatch, expression: false})
      setSelectedPreset(preset)
    }
  }

  const selectedClassName = (preset)=>{
    if(preset.label == selectedPreset.label){
      return 'selected preset-row';
    }else{
      return 'preset-row';
    }
  }

  const selectedMenu = (menuLink)=>{
    if(menuLink == menu){
      return 'selected menu-link';
    }else{
      return 'menu-link';
    }
  }

  return (
		<div className="presets-modal zoom-in">
      <div className="menu-select">
        <CloseButton
          setHeaderOpen={setPresetsOpen}
          headerOpen={true} />
        <a className={selectedMenu('midi')} onClick={()=>{setMenu('midi')}}>MIDI AND CONTROLS</a>
        {
          midiData.output &&
          <a className={selectedMenu('presets')} onClick={()=>{setMenu('presets')}}>PEDAL PRESETS AND SETTINGS</a>
        }
      </div>
      <div className="presets-modal-background">
      </div>
      <div className="presets-modal-content">
        <div>
          {
            menu == 'midi' &&
            <NavMenu midiObject={midiObject}/>
          }
          {
            menu == 'presets' &&
            <div className="sysex-menu fade-in">
              <div className="global-settings">
                <label>GLOBAL SETTINGS</label>
                <GlobalSettingsTable sysexByte={sysexByte} midiObject={midiObject}/>
              </div>
              <div className="presets-container">
                <label>PRESETS</label>
                {presets.map((preset, i) =>{
                  return <div key={i} onClick={()=> setPreset(preset)} className={selectedClassName(preset)}>{preset.label}</div>
                })}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
