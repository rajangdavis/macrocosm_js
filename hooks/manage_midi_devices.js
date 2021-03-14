import { useReducer } from 'react'
import MerisComputedFunctions from '../components/pedals/meris_pedals/meris_computed_functions'


export default function ManageMidiDevices(){

	let initialState = {
    midi_device_id: Date.now(),
    // macro_id: macro.macro_id,
    // name: `MIDI Device #${macro.midi_devices.length + 1}`,
    // component	: component,
    outport: "",
    inport: "",
    pedals: [],
    open: true,
    show_pedals: false
  }
	


	let reducer = (state, action) =>{
		

		let updateMidiDevice = (state, field, value)=>{
		  // let [index, midiDevice] = midiDeviceIndex(state, action)
		  // console.log(`midiDevice[${field}] was: ${midiDevice[field]}`)
		  // midiDevice[field] = value;
		  // console.log(`midiDevice[${field}] is now: ${midiDevice[field]}`)
		  // macro.splice(index, 1 , midiDevice);
		  // return [...state];
		}

		let addNewMidiDevice = (state, action)=>{
		  // let [index, macro] = macroIndex(state, action);
		  // let new_midi_device_state = macro.midi_devices.concat([newMidiDevice(macro, action.component)])
		  // console.log(new_midi_device_state)
		  // updateMacro(state, 'midi_devices', new_midi_device_state)
		}

		let midiDeviceIndex = (state, action)=>{
		  // let [_, macro] = macroIndex(state, action);
		  // let midiDevice = macro.midi_devices.filter( x => x.midi_device_id == action.midi_device_id)[0]
		  // let index = macro.midi_devices.findIndex( x => x.midi_device_id == action.midi_device_id)
		  // return [index, midiDevice];
		}

		switch(action.type){
      case 'toggle-pedal_options':
        return updateMidiDevice(state, 'open', action.new_value)
      case 'add-pedal-to-midi-device':
      	let newPedal = action.component;
      	console.log(newPedal);
      	state.pedals.push(newPedal);
      	return {...state}
      default:
        throw new Error();
    }


	}
	return useReducer(reducer, initialState);

}
