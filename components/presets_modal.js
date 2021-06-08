import NavButton from './nav_button'
import {useState} from 'react'

export default function PresetsModal(props){

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
        <div>

        </div>
        <label>PRESETS</label>
        <div>
          {props.presets.map((preset, i) =>{
            return <div key={i} onClick={()=> props.setSelectedPreset(preset.label)} className={selectedClassName(preset)}>{preset.label}</div>
        	})}
        </div>
      </div>
    </div>
  )
}
