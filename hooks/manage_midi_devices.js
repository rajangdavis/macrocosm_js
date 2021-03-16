import { useReducer, useState } from 'react'
import pedals_ from '../components/pedals/map'

export default function ManageMidiDevices(props){

	let [pedals, setPedals] = useState([]);
	let initialState = {
    midiDeviceId: Date.now(),
    // macro_id: macro.macro_id,
    // name: `MIDI Device #${macro.midi_devices.length + 1}`,
    // component	: component,
    inputPort: "",
    outputPort: "",
    pedals: pedals,
    open: true,
    showPedals: false
  }
	
	let pedalHash = {}
	var pedalsMap = pedals_.map(x =>{
		let cf = x.computedFunctions(props, x.pedalData);
		x.pedalData.computedFunctions = cf
		pedalHash[x.pedalData.label] = (inputPort, outputPort) => {
			x.pedalData.inputPort = inputPort
			x.pedalData.outputPort = outputPort
			return x.component(props, x.pedalData)
		}
		return;
	})

	let resetPedalHash = (newPedal)=>{
		console.log(pedalHash)
		delete pedalHash[newPedal.label]
		console.log(pedalHash)
  	pedalHash[newPedal.label] = (inputPort, outputPort) => {
			pedalData.inputPort = inputPort
			pedalData.outputPort = outputPort
			newPedalVersion = pedals_.filter(x => x.label == newPedal.label)[0]
  		let cf = newPedalVersion.computedFunctions(props, newPedalVersion.pedalData);
  		pedalData.computedFunctions = cf;
			return test(props, pedalData)
		}
		console.log(pedalHash)
	}

	let reducer = (state, action) =>{		

		// let updateMidiDevice = (state, field, value)=>{
		//   // let [index, midiDevice] = midiDeviceIndex(state, action)
		//   // console.log(`midiDevice[${field}] was: ${midiDevice[field]}`)
		//   // midiDevice[field] = value;
		//   // console.log(`midiDevice[${field}] is now: ${midiDevice[field]}`)
		//   // macro.splice(index, 1 , midiDevice);
		//   // return [...state];
		// }

		// let addNewMidiDevice = (state, action)=>{
		//   // let [index, macro] = macroIndex(state, action);
		//   // let new_midi_device_state = macro.midi_devices.concat([newMidiDevice(macro, action.component)])
		//   // console.log(new_midi_device_state)
		//   // updateMacro(state, 'midi_devices', new_midi_device_state)
		// }

		// let midiDeviceIndex = (state, action)=>{
		// 	let midiDevice = state.filter( x => x.midiDeviceId == action.midiDeviceId)[0]
  //     let index = state.findIndex( x => x.midiDeviceId == action.midiDeviceId)
  //     return [index, midiDevice];
		// }

		switch(action.type){
			case 'update-midi-device':
				state[action.field] = action.new_value;
				return {...state}
      case 'toggle-pedal-options':
        state.showPedals = action.new_value;
				return {...state}
			case 'update-midi-device-from-pedal':

				return {...state}
      case 'add-pedal-to-midi-device':

      	let newPedal = action.component.pedalData;
      	state.pedals.push(pedalHash[newPedal.label]);
      	resetPedalHash(newPedal)
      	state.showPedals = false;
      	return {...state}
      default:
        throw new Error();
    }

	}
	return useReducer(reducer, initialState);

}
