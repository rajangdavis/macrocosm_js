import { useReducer } from 'react'

export default function ManageMacros(){

	let reducer = (state, action) =>{

    let updateMacro = (state, field, value)=>{
      let [index, macro] = macroIndex(state, action);
      console.log(`macro[${field}] was: ${macro[field]}`)
      macro[field] = value;
      console.log(`macro[${field}] is now: ${macro[field]}`)
      state.splice(index, 1 , macro);
      console.log(state)
      return [...state];
    }

    let newMacro = (globalMacros)=>{
      return {
        macro_id: Date.now(),
        name: `Macro #${globalMacros.length + 1}`,
        midi_devices: [],
        open: true,
        order: globalMacros.length,
        show_midi_devices: false
      }
    }
    
    let macroIndex = (state, action)=>{
      let macro = state.filter( x => x.macro_id == action.macro_id)[0]
      let index = state.findIndex( x => x.macro_id == action.macro_id)
      return [index, macro];
    }

    switch(action.type){
      case 'add-macro':
        let newState = [ ...state, newMacro(state)]
        return [ ...state, newMacro(state)]
      case 'toggle-midi-device':
        return updateMidiDevice(state, 'open', action.new_value)
      case 'remove-macro':
        return [...state.filter( x => x.macro_id != action.macro_id)]
      case 'add-midi-to-macro':
        addNewMidiDevice(state, action)
        return updateMacro(state, 'show_midi_devices', false)
      case 'toggle-midi-options':
        return updateMacro(state, 'show_midi_devices', action.new_value)
      default:
        throw new Error();
    }
	}
	return useReducer(reducer, []);
}
