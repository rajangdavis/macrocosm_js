import { useReducer } from 'react'

export default function ManageMacros(){

	let reducer = (state, action) =>{

    // CREATE
    let createMacro = (state)=>{
      let initialState = {
        macro_id: Date.now(),
        name: `Macro #${state.length + 1}`,
        midi_devices: [],
        open: true,
        order: state.length,
        show_midi_devices: false
      }
      return [ ...state, initialState]
    }

    // READ
    let macroIndex = (state, action)=>{
      let macro = state.filter( x => x.macro_id == action.macro_id)[0]
      let index = state.findIndex( x => x.macro_id == action.macro_id)
      return [index, macro];
    }

    // UPDATE
    let updateMacro = (state, action)=>{
      let [index, macro] = macroIndex(state, action)
      macro[action.field] = action.new_value;
      state.splice(index, 1 , macro);
      return [...state];
    }

    // DESTROY
    let removeMacro = (state, action)=>{
      return [...state.filter( x => x.macro_id != action.macro_id)]
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let newMidiDevice = (state, action)=>{
      return {
        midiDeviceId: Date.now(),
        macro_id: state.macro_id,
        name: `MIDI Device #${state.midi_devices.length + 1}`,
        component  : action.component,
        inputPort: "",
        outputPort: "",
        pedals: [],
        open: true,
        showPedals: false
      }
    }
    let addNewMidiDevice = (state, action)=>{
      let [index, macro] = macroIndex(state, action);
      action.field = 'midi_devices'
      action.new_value = macro.midi_devices.concat([newMidiDevice(macro, action)])
      return updateMacro(state, action)
    }
    
    // READ
    let midiDeviceIndex = (state, action)=>{
      let [index, macro] = macroIndex(state, action);
    }

    // UPDATE
    let updateMidiDevice = (state, action)=>{
      let [index, macro] = macroIndex(state, action)
      macro.midi_devices
      // macro[action.field] = action.new_value;
      // state.splice(index, 1 , macro);
      return [...state];
    }
    // DESTROY



////////////////////////////////////////////////////////////////////////////////////////////////////////////

    switch(action.type){
      case 'create-macro':
        return createMacro(state);
      case 'update-macro':
        return updateMacro(state, action)
      case 'update-midi-device':
        return updateMidiDevice(state, action)
      case 'add-midi-to-macro':
        return addNewMidiDevice(state, action)
      case 'remove-macro':
        return removeMacro(state, action);
      default:
        throw new Error();
    }
	}
	return useReducer(reducer, []);
}
