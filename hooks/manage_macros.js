// import { useReducer } from 'react'
import { useImmerReducer } from "use-immer";

export default function ManageMacros(){

  let reducer = (state, action) =>{
    console.log(action)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      state.push(initialState)
    }

    // READ
    let readMacro = (state, action)=>{
      let macro = state.filter( x => x.macro_id == action.macro_id)[0]
      let index = state.findIndex( x => x.macro_id == action.macro_id)
      return [index, macro];
    }

    // UPDATE
    let updateMacro = (state, action)=>{
      let [index, macro] = readMacro(state, action)
      macro[action.field] = action.new_value;
      state.splice(index, 1 , macro);
    }

    // DESTROY
    let removeMacro = (state, action)=>{
      return state.filter( x => x.macro_id != action.macro_id)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////


 
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let createMidiDevice = (state, action)=>{
      let newMidiDevice = (state, action)=>{
        return {
          midi_device_id: Date.now(),
          macro_id: state.macro_id,
          name: `MIDI Device #${state.midi_devices.length + 1}`,
          component: action.component,
          input_port: "",
          output_port: "",
          device_port: "",
          midi_channel: "",
          pedals: [],
          open: true,
          show_pedals: false
        }
      }
      let [index, macro] = readMacro(state, action);
      action.field = 'midi_devices'
      action.new_value = macro.midi_devices.concat([newMidiDevice(macro, action)])
      return updateMacro(state, action)
    }
    
    // READ
    let readMidiDeviceIndex = (state, action)=>{
      let [macroIndex, macro] = readMacro(state, action)
      let midiDevice = macro.midi_devices.filter(x => x.midi_device_id == action.midi_device_id)[0]
      let midiIndex = macro.midi_devices.findIndex(x => x.midi_device_id == action.midi_device_id)
      return [midiIndex, midiDevice, macroIndex, macro];
    }

    // UPDATE
    let updateMidiDevice = (state, action)=>{
      let [midiIndex, midiDevice, macroIndex, macro] = readMidiDeviceIndex(state, action)
      midiDevice[action.field] = action.new_value;
      macro.midi_devices.splice(midiIndex, 1, midiDevice)
    }
    
    // DESTROY
    let removeMidiDevice = (state, action)=>{
      let [midiIndex, midiDevice, macroIndex, macro] = readMidiDeviceIndex(state, action)
      macro.midi_devices = macro.midi_devices.filter(x => x.midi_device_id != action.midi_device_id)
      state.splice(macroIndex, 1 , macro);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let createPedal = (state, action)=>{
      let newPedal = (state, action)=>{
        return {
          pedal_id: Date.now(),
          macro_id: state.macro_id,
          name: `Pedal #${state.pedals.length + 1}`,
          component  : action.component,
          input_port: "",
          output_port: "",
          open: true,
          show_pedals: false
        }
      }
      let [index, macro] = readMacro(state, action);
      action.field = 'midi_devices'
      action.new_value = macro.midi_devices.concat([newMidiDevice(macro, action)])
      return updateMacro(state, action)
    }
    
    // READ
    let pedalIndex = (state, action)=>{
      let [_, macro] = readMacro(state, action)
      let midiDevice = macro.midi_devices.filter(x => x.midi_device_id == action.midi_device_id)
      let index = macro.midi_devices.findIndex(x => x.midi_device_id == action.midi_device_id)
      return [index, midiDevice]
    }

    // UPDATE
    let updatePedal = (state, action)=>{
      let [index, midiDevice] = readMidiDeviceIndex(state, action)
      // macro.midi_devices
      // macro[action.field] = action.new_value;
      // state.splice(index, 1 , macro);
      return [...state];
    }
    
    // DESTROY
    let removePedal = (state, action)=>{
      // return [...state.filter( x => x.macro_id != action.macro_id)]
      return [...state]
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
    switch(action.type){
      case 'create-macro':
        return createMacro(state);
      case 'update-macro':
        return updateMacro(state, action)
      case 'remove-macro':
        return removeMacro(state, action);
      case 'create-midi-device':
        return createMidiDevice(state, action)
      case 'update-midi-device':
        return updateMidiDevice(state, action)
      case 'remove-midi-device':
        return removeMidiDevice(state, action)
      case 'create-pedal':
        return createPedal(state, action)
      case 'update-pedal':
        return updatePedal(state, action)
      case 'remove-pedal':
        return removePedal(state, action)
      default:
        throw new Error();
    }
	}
	return useImmerReducer(reducer, []);
}
