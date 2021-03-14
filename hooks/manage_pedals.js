import { useReducer } from 'react'

export default function ManagePedals(){

	let reducer = (state, action) =>{
		
		let newMidiDevice = (component)=>{
		  return {
		    midi_device_id: Date.now(),
		    // macro_id: macro.macro_id,
		    // name: `MIDI Device #${macro.midi_devices.length + 1}`,
		    component: component,
		    outport: "",
		    inport: "",
		    pedals: [],
		    open: true,
		    show_pedals: false
		  }
		}

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
      case 'add-pedal':
        let newState = [ ...state, newMacro(state)]
        return [ ...state, newMacro(state)]
      case 'toggle-pedal_options':
        return updateMidiDevice(state, 'open', action.new_value)
      default:
        throw new Error();
    }


	}
	return useReducer(reducer, []);

}
