import SliderControls from './slider_controls'
import CustomSelect from './custom_select'
import MenuKnob from './menu_knob'
import MidiChannelInput from './midi_channel_input'
import {MidiConfigContext} from '../hooks/midi_config'
import {SliderStateContext} from '../hooks/slider_state'
import useLocalStorage from '../hooks/use_local_storage'
import {useState, useContext} from 'react'

export default function NavMenu(props){
  const {midiConfig, updateConfig} = useContext(MidiConfigContext);
  const {sliderState, updateSliderState} = useContext(SliderStateContext);

  const updateMidiChannel = (e)=>{
		updateConfig('enzoChannel', parseInt(e.target.value))
  }

  const updateMidiOutput = (option)=>{
		updateConfig('output', option)
		props.setIsConnected(true)
  }

  const updateMidiInputForExpression = (option)=>{
		updateConfig('inputForExpression', option)
		// props.setIsConnected(true)
  }

	const outputOptions = props.midiObject != undefined ? props.midiObject.outputs.map(x=> x.name) : []
	const inputOptions = props.midiObject != undefined ? props.midiObject.inputs.map(x=> x.name) : []
  
  return (<div className="nav-menu open fade-in">
		<div className="options-block">
			<label>MIDI OPTIONS</label>
			<hr/>
			<div className="midi-options">
				<CustomSelect
					onChange={updateMidiInputForExpression}
					defaultOption={midiConfig.inputForExpression}
					closeIf={props.headerOpen}
					inputLabel={"MIDI INPUT FOR EXPRESSION"}
					options={inputOptions}
				/>
				<CustomSelect
					onChange={updateMidiOutput}
					defaultOption={midiConfig.output}
					closeIf={props.headerOpen}
					inputLabel={"MIDI OUTPUT"}
					options={outputOptions}
				/>
				<MidiChannelInput value={midiConfig.enzoChannel} onChange={updateMidiChannel}/>
			</div>
		</div>
		<div className="options-block">
			<label>CONTROL OPTIONS</label>
			<hr/>
			<div className="control-options">
				<SliderControls sliderData={sliderState} setSliderData={updateSliderState}/>
				<MenuKnob sliderData={sliderState} setSliderData={updateSliderState} />
			</div>
		</div>
   </div>)
}
