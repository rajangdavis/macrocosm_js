import { useReducer } from 'react';

export default function MerisState(pedalData){

	let merisStateReducer = (state, action) =>{
    switch(action.type){
      case 'update-pedal-state':
        state[action.key] = action.value;
        return {...state };
      default:
        throw new Error();
    }
  }
  
  let initialState = {
    active: true,
    presetsActive: false,
    presetsVal: 0,
    altMode: false,
    midiChannel: "1",
    midiPreset: "1",
    inputPort: "",
    outputPort: ""
  }

  Object.keys(pedalData.pedalFunctions).map((key)=>{
    let notDupedKnob = key[key.length - 1] != "_"
    if (pedalData.pedalFunctions[key].ccValue && notDupedKnob)
      initialState[key] = {
        ccValue: pedalData.pedalFunctions[key].ccValue,
        value: 0,
      }
  });

  return useReducer(merisStateReducer, initialState);
}
