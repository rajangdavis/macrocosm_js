import { useReducer } from 'react'

export default function ManageMacros(){

	let reducer = (state, action) =>{

    let updateMacro = (state, field, value)=>{
      let [index, macro] = macroIndex(state, action);
      console.log(`macro[${field}] was: ${macro[field]}`)
      macro[field] = value;
      console.log(`macro[${field}] is now: ${macro[field]}`)
      state.splice(index, 1 , macro);
      return [...state];
    }

    let newMacro = (state)=>{
      return {
        macro_id: Date.now(),
        name: `Macro #${state.length + 1}`,
        midi_devices: [],
        open: true,
        order: state.length,
        show_midi_devices: false
      }
    }
    
    let newMidiDevice = (state, component)=>{
      return {
        midi_device_id: Date.now(),
        name: `MIDI Device #${state.length + 1}`,
        component: component,
        pedals: [],
        open: true,
      }
    }

    let macroIndex = (state, action)=>{
      let macro = state.filter( x => x.macro_id == action.macro_id)[0]
      let index = state.findIndex( x => x.macro_id == action.macro_id)
      return [index, macro];
    }
    
    let addNewMidiDevice = (state, action)=>{
      let [index, macro] = macroIndex(state, action);
      let new_midi_device_state = macro.midi_devices.concat([newMidiDevice(macro.midi_devices, action.component)])
      console.log(new_midi_device_state)
      updateMacro(state, 'midi_devices', new_midi_device_state)
    }

    let updateMidiDevice = (state, field, value)=>{
      let [index, macro] = macroIndex(state, action);
      console.log(`macro[${field}] was: ${macro[field]}`)
      macro[field] = value;
      console.log(`macro[${field}] is now: ${macro[field]}`)
      state.splice(index, 1 , macro);
      return [...state];
    }

    switch(action.type){
      case 'add-macro':
        return [ ...state, newMacro(state)]
      case 'toggle-midi-options':
        return updateMacro(state, 'show_midi_devices', action.new_value)
      case 'toggle-midi-device':
        return updateMacro(state, 'show_midi_devices', action.new_value)
      case 'remove-macro':
        return [...state.filter( x => x.macro_id != action.macro_id)]
      case 'add-midi-to-macro':
        addNewMidiDevice(state, action)
        return updateMacro(state, 'show_midi_devices', false)
      default:
        throw new Error();
    }
	}
	return useReducer(reducer, []);
}
