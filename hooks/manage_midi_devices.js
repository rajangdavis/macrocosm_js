import { useReducer, useState } from 'react'
import pedals_ from '../components/pedals/map'

export default function ManageMidiDevices(props){
	

	let reducer = (state, action) =>{		

		// let updateMidiDevice = (state, field, value)=>{
		//   // let [index, midiDevice] = midiDeviceIndex(state, action)
		//   // console.log(`midiDevice[${field}] was: ${midiDevice[field]}`)
		//   // midiDevice[field] = value;
		//   // console.log(`midiDevice[${field}] is now: ${midiDevice[field]}`)
		//   // macro.splice(index, 1 , midiDevice);
		//   // return [...state];
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
