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
    
    let newMidiDevice = (macro, component)=>{
      return {
        midi_device_id: Date.now(),
        macro_id: macro.macro_id,
        name: `MIDI Device #${macro.midi_devices.length + 1}`,
        component: component,
        pedals: [],
        open: true,
        show_pedals: false
      }
    }

    let macroIndex = (state, action)=>{
      let macro = state.filter( x => x.macro_id == action.macro_id)[0]
      let index = state.findIndex( x => x.macro_id == action.macro_id)
      return [index, macro];
    }

    let updateMidiDevice = (state, field, value)=>{
      let [index, midiDevice] = midiDeviceIndex(state, action)
      console.log(`midiDevice[${field}] was: ${midiDevice[field]}`)
      midiDevice[field] = value;
      console.log(`midiDevice[${field}] is now: ${midiDevice[field]}`)
      macro.splice(index, 1 , midiDevice);
      return [...state];
    }
    
    let addNewMidiDevice = (state, action)=>{
      let [index, macro] = macroIndex(state, action);
      let new_midi_device_state = macro.midi_devices.concat([newMidiDevice(macro, action.component)])
      console.log(new_midi_device_state)
      updateMacro(state, 'midi_devices', new_midi_device_state)
    }

    let midiDeviceIndex = (state, action)=>{
      let [_, macro] = macroIndex(state, action);
      let midiDevice = macro.midi_devices.filter( x => x.midi_device_id == action.midi_device_id)[0]
      let index = macro.midi_devices.findIndex( x => x.midi_device_id == action.midi_device_id)
      return [index, midiDevice];
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
