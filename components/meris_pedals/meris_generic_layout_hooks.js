import MerisPresets from './meris_presets'
import MerisGenericControls from './meris_generic_controls'
import MidiChannelSelect from '../midi_channel_select'
import ProgramChangeInput from '../program_change_input'
import MidiDevicePortSelector from '../midi_device_port_selector'
import { useState } from 'react';

export default function MerisGenericLayout(props, pedalData){

  const [active, setActive] = useState(true)
  const [altMode, setAltMode] = useState(false)
  const [midiChannel, setMidiChannel] = useState("1")
  const [midiPreset, setMidiPreset] = useState("1")
  const [inputPort, setInputPort] = useState("")
  const [outputPort, setOutputPort] = useState("")

  let midiChannelChange = (e)=>{
    return setMidiChannel(event.target.value);
  }

  let showControls = ()=>{
    console.log('showControls')
  }

  let inputPortChange = (e)=>{
    return setInputPort(event.target.value);
  }

  let outputPortChange = (e)=>{
    return setOutputPort(event.target.value);
  }
  
  let outputPortNotSet = ()=>{
    return outputPort == ""
  }

  let deviceOutput = ()=>{
    return props.midiObject.outputValues.filter(x => x.name == outputPort)[0]
  }

  let programNumberChange = (e)=>{
    return setMidiPreset(event.target.value)
  }

  let changeAltState = (e)=>{
    return setAltMode(!altMode)
  }

  let inAltMode = ()=>{
    return altMode == true ? 'alt-' : ''
  }
  
  return (<div className={pedalData.className}>
      <a onClick={showControls}>{pedalData.name}</a>
      <div className={`interface`} >
        <div className="channel-input">
          {MidiDevicePortSelector(inputPortChange,"input", props.midiObject.inputValues)}
          {MidiDevicePortSelector(outputPortChange,"output", props.midiObject.outputValues)}
          <MidiChannelSelect className={"midi-channel-input"} midiChannelChange={midiChannelChange} midiChannel={midiChannel}/>
          <MerisPresets deviceOutput={deviceOutput} midiChannel={midiChannel} />
        </div>
        <div className={`${inAltMode()}controls`}>
          <MerisGenericControls direction={`${inAltMode()}left`} pedalData={pedalData} midiChannel={midiChannel} deviceOutput={deviceOutput} changeAltState={changeAltState}/>
          <MerisGenericControls direction={`${inAltMode()}center`} pedalData={pedalData} midiChannel={midiChannel} deviceOutput={deviceOutput}/>
          <MerisGenericControls direction={`${inAltMode()}right`} pedalData={pedalData} midiChannel={midiChannel} deviceOutput={deviceOutput}/>
        </div>
      </div>      
    </div>)
}
