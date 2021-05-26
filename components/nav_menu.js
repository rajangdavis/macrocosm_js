import SliderControls from './slider_controls'
import CustomSelect from './custom_select'
import MenuKnob from './menu_knob'
import MidiChannelInput from './midi_channel_input'
import {WebMidi} from 'webmidi'
import {useEffect, useState} from 'react'

export default function NavMenu(props){
	useEffect(()=>{
    WebMidi.enable({sysex: true})
      .then((access)=>{
        props.setMidiObject(access);
      })
  }, []);

	const outputOptions = props.midiObject != undefined ? props.midiObject.outputs.map(x=> x.name) : []
	let className = props.headerOpen ? "nav-menu open" : "nav-menu closed"
  
  return (<div className={className}>
		<div className="options-block">
			<label>MIDI OPTIONS</label>
			<hr/>
			<div className="midi-options">
				<CustomSelect closeIf={props.headerOpen} inputLabel={"MIDI OUTPUT"} options={outputOptions}/>
				<MidiChannelInput />
			</div>
		</div>
		<div className="options-block">
			<label>CONTROL OPTIONS</label>
			<hr/>
			<div className="control-options">
				<SliderControls sliderData={props.sliderData} setSliderData={props.setSliderData}/>
				<MenuKnob sliderData={props.sliderData} setSliderData={props.setSliderData} />
			</div>
		</div>
   </div>)
}
