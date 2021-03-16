import ManageMidiDevices from '../../hooks/manage_midi_devices'
import MidiDevicePortSelector from '../midi_device_port_selector'
import { useState } from 'react'
import MerisComputedFunctions from '../pedals/meris_pedals/meris_computed_functions'
import pedals_ from '../pedals/map'

export default function MerisMidiIo(props){
  const [midiDeviceState, midiDispatch] = ManageMidiDevices(props);
  let outputPortChange = (e) => midiDispatch({ type: 'update-midi-device', new_value: e.target.value, field: 'outputPort' })
  let inputPortChange = (e) => midiDispatch({ type: 'update-midi-device',  new_value: e.target.value, field: 'inputPort' })
  let toggleMidiDeviceOptions = () => midiDispatch({ type: 'toggle-pedal-options', new_value: !midiDeviceState.showPedals})
  let addPedal = (x) => midiDispatch({ type: 'add-pedal-to-midi-device', component: x, props: props})

  let canShowPedals = ()=>{
    return midiDeviceState.showPedals == true ? 'midi-ports-select' : 'hidden';
  }

  return (<div className="meris-midi-io">
        <a>Meris MIDI IO</a>
        {MidiDevicePortSelector(inputPortChange,"input", props.midiObject.inputValues)}
        {MidiDevicePortSelector(outputPortChange,"output", props.midiObject.outputValues)}
        <p onClick={toggleMidiDeviceOptions}>Add Pedals</p>
        <div className={canShowPedals()}>
          {pedals_.map((x,i)=> {
            return <p key={i} onClick={()=> addPedal(x)}>{x.pedalData.label}</p>
          })}
        </div>
        <div>
          {midiDeviceState.pedals.map((device, y)=>{
            return <div key={y}>{device(midiDeviceState.inputPort, midiDeviceState.outputPort)}</div>
          })}
        </div>
      </div>)
}

  // const [active, setActive] = useState(false);
  // const [programNumber, setProgramNumber] = useState("1");
  // const [inputPort, setInputPort] = useState("1");
  // const [outputPort, setOutputPort] = useState("1");

  // const inputPortChange = (e) => {
  //   // setInputPort(event.target.value)
  // }

  // const outputPortChange = (e) => {
  //   // setInputPort(event.target.value)
  // }
  
  // const inputPortNotSet = () => {
  //   return inputPort == ""
  // }

  // const outputPortNotSet = () => {
  //   return outputPort == ""
  // }  