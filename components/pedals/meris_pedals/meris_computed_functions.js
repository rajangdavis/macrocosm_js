export default function MerisComputedFunctions(props){

	return {
		removePedal:  ()=>{
	    props.dispatch({
	    	type: 'remove-pedal',
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

		midiChannelChange:  (e)=>{
			e.preventDefault();
			e.stopPropagation();
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'midi_channel', 
	    	new_value: event.target.value, 
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  controlChange:  (key, e)=>{
	    return ()=>{
	      props.dispatch({
	      	type: 'update-pedal', 
	      	field: key, 
	      	new_value: event.target.value, 
	      	midi_device_id:  props.midi_device_id, 
      	  macro_id: props.macro_id, 
      	  pedal_id: props.pedal_id
      	})
	    }
	  },

	  showControls:  ()=>{
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'active', 
	    	new_value: !props.active,
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  inputPortChange:  (e)=>{
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'input_port', 
	    	new_value: event.target.value, 
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  outputPortChange:  (e)=>{
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'output_port', 
	    	new_value: event.target.value, 
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  programNumberChange:  (e)=>{
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'midi_preset', 
	    	new_value: event.target.value, 
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  changeAltState:  (e)=>{
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'alt_mode', 
	    	new_value: !props.alt_mode, 
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  showOrHidePresets:  ()=>{
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'presets_active', 
	    	new_value: !props.presets_active, 
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  programNumberSend:  (value)=>{
	    let intMidiChannel =  parseInt(props.midi_channel);
	    let intProgramNumber =  parseInt(value);
	    let deviceOutput = props.midiObject.outputValues.filter(x => x.name == props.outputPort)[0]
	    deviceOutput.setProgram(intProgramNumber, {channels: intMidiChannel});
	    console.log("Command sent", {intProgramNumber: intProgramNumber, channels: intMidiChannel})
	    props.dispatch({
	    	type: 'update-pedal', 
	    	field: 'presets_val', 
	    	new_value: !props.presetsActive,
	    	midi_device_id: props.midi_device_id, 
	    	macro_id: props.macro_id, 
	    	pedal_id: props.pedal_id
	    })
	  },

	  currentMidiChannel:  ()=>{
	    return props.midi_channel
	  },

	  showOrHidePedalLabel:  ()=>{
	    return props.active ?  `${props.label}[-]`: `${props.label}[+]`
	  },
	  
	  outputPortNotSet:  ()=>{
	    return props.output_port == ""
	  },

	  pedalActive:  ()=>{
	    return props.active ? "" : "hidden"
	  },

	  inAltMode:  ()=>{
	    return props.alt_mode == true ? 'alt-' : ''
	  },

	  arePresetsActive:  ()=>{
	    return props.presets_active ? "" : "hidden"
	  },

	  showOrHidePresetsLabel:  ()=>{
	    return props.presets_active ?  "Presets[-]": "Presets[+]"
	  }
	} 
}
