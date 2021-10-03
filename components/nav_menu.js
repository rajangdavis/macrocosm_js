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

  const updateMidiOutput = (option)=>{
		updateConfig('output', option)
		// props.setIsConnected(true)
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
			<div className="midi-options">
				{/*<CustomSelect
					onChange={updateMidiInputForExpression}
					defaultOption={midiConfig.inputForExpression}
					closeIf={props.headerOpen}
					inputLabel={"MIDI INPUT FOR EXPRESSION"}
					options={inputOptions}
				/>*/}
				<CustomSelect
					onChange={updateMidiOutput}
					defaultOption={midiConfig.output}
					closeIf={props.headerOpen}
					inputLabel={"MIDI OUTPUT"}
					options={outputOptions}
				/>
				<div className="channels-block">
					<MidiChannelInput label={'ENZO'} midiConfig={midiConfig} value={'enzoChannel'} updateConfig={updateConfig}/>
					<MidiChannelInput label={'HEDRA'} midiConfig={midiConfig} value={'hedraChannel'} updateConfig={updateConfig}/>
					<MidiChannelInput label={'POLYMOON'} midiConfig={midiConfig} value={'polymoonChannel'} updateConfig={updateConfig}/>
					<MidiChannelInput label={'MERCURY7'} midiConfig={midiConfig} value={'mercury7Channel'} updateConfig={updateConfig}/>
					<MidiChannelInput label={'OTTOBIT JR'} midiConfig={midiConfig} value={'ottobitJrChannel'} updateConfig={updateConfig}/>
				</div>
			</div>
		</div>
		<div className="options-block">
			<label>CONTROL OPTIONS</label>
			<div className="control-options">
				<SliderControls sliderData={sliderState} setSliderData={updateSliderState}/>
				<MenuKnob sliderData={sliderState} setSliderData={updateSliderState} />
			</div>
		</div>
   </div>)
}
