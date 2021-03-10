import React, {useState, useReducer} from 'react'
import {midiDevices} from '../components/midi_devices/map'

export default function MacroButton(props){
  let removeMacro = () => props.dispatch({ type: 'remove-macro', macro_id: props.buttonData.macro_id })
  let toggleMidiDeviceOptions = () => props.dispatch({ type: 'toggle-midi-options', macro_id: props.buttonData.macro_id, new_value: !props.buttonData.show_midi_devices })
  let addMidiDevice = (component) => props.dispatch({ type: 'add-midi-to-macro', macro_id: props.buttonData.macro_id, component: component })

  return (
    <div className="macro">
      <div onClick={removeMacro}>Delete</div>
      <div className="midi-devices">
        <div onClick={toggleMidiDeviceOptions}>Add MIDI Device</div>
      </div>
      <div>
        {props.buttonData.midi_devices.map((midi_device, i) => {
          return <div key={i}>{midi_device.component(props.midiObject)}</div>
        } )}
      </div>
      <div className={props.buttonData.show_midi_devices ? '' : 'hidden'}>
        {midiDevices.map((x,i)=> {
          return <p key={i} onClick={()=> addMidiDevice(x.component)}>{x.label}</p>
        })}
      </div>
    </div>
  )

}
