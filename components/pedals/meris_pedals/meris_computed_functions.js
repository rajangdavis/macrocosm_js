import MerisState from '../../../hooks/meris_state'

export default function MerisComputedFunctions(props, pedalData){
	let [merisPedalState, merisPedalDispatch] = MerisState(pedalData)
	
	return {
		midiChannelChange:  (e)=>{
	    merisPedalDispatch({type: 'update-pedal-state', key: 'midiChannel', value: event.target.value})
	  },

	  controlChange:  (key, e)=>{
	    return ()=>{
	      merisPedalDispatch({type: 'update-pedal-state', key: key, value: event.target.value})
	    }
	  },

	  showControls:  ()=>{
	    merisPedalDispatch({type: 'update-pedal-state', key: 'active', value: !merisPedalState.active})
	  },

	  inputPortChange:  (e)=>{
	    merisPedalDispatch({type: 'update-pedal-state', key: 'inputPort', value: event.target.value})
	  },

	  outputPortChange:  (e)=>{
	    merisPedalDispatch({type: 'update-pedal-state', key: 'outputPort', value: event.target.value})
	  },

	  programNumberChange:  (e)=>{
	    merisPedalDispatch({type: 'update-pedal-state', key: 'midiPreset', value: event.target.value})
	  },

	  changeAltState:  (e)=>{
	    merisPedalDispatch({type: 'update-pedal-state', key: 'altMode', value: !merisPedalState.altMode})
	  },

	  showOrHidePresets:  ()=>{
	    merisPedalDispatch({type: 'update-pedal-state', key: 'presetsActive', value: !merisPedalState.presetsActive})
	  },

	  programNumberSend:  (value)=>{
	    intMidiChannel:  parseInt(midiChannel);
	    intProgramNumber:  parseInt(value);
	    deviceOutput().setProgram(intProgramNumber, {channels: intMidiChannel});
	    console.log("Command sent", {intProgramNumber: intProgramNumber, channels: intMidiChannel})
	    merisPedalDispatch({type: 'update-pedal-state', key: 'presetsVal', value: !merisPedalState.presetsActive})
	  },

	  currentMidiChannel:  ()=>{
	    return merisPedalState.midiChannel
	  },

	  showOrHidePedalLabel:  ()=>{
	    return merisPedalState.active ?  `${pedalData.name}[-]`: `${pedalData.name}[+]`
	  },
	  
	  outputPortNotSet:  ()=>{
	    return merisPedalState.outputPort == ""
	  },

	  deviceOutput:  ()=>{
	    return props.midiObject.outputValues.filter(x => x.name == merisPedalState.outputPort)[0]
	  },

	  pedalActive:  ()=>{
	    return merisPedalState.active ? "" : "hidden"
	  },

	  inAltMode:  ()=>{
	    return merisPedalState.altMode == true ? 'alt-' : ''
	  },

	  arePresetsActive:  ()=>{
	    return merisPedalState.presetsActive ? "" : "hidden"
	  },

	  showOrHidePresetsLabel:  ()=>{
	    return merisPedalState.presetsActive ?  "Presets[-]": "Presets[+]"
	  }
	} 
}
