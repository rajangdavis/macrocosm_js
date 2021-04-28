module.exports = {
	HandleMidiOutput: (state, action, props = {})=>{
		if(props.midiObject && props.midiChannel && props.midiOutput){
			let ccValue = state[action.key].ccValue;
			let {midiObject, midiChannel, midiOutput} = props;
			let deviceOutput = midiObject.outputs.filter(x =>{
				return x.name == midiOutput
			})[0]
			console.log(ccValue, action.value, {channels: midiChannel})
			deviceOutput.sendControlChange(ccValue, action.value, {channels: parseInt(midiChannel)})
		}
	},

	HandleMidiInput: (props = {})=>{
		if(props.midiObject && props.midiChannel && props.midiInput){
			let ccValue = state[action.key].ccValue;
			let {midiObject, midiChannel, midiInput} = props;
			let deviceInput = midiObject.outputs.filter(x =>{
				return x.name == midiInput
			})[0]
			// console.log(ccValue, action.value, {channels: midiChannel})
			// deviceOutput.sendControlChange(ccValue, action.value, {channels: parseInt(midiChannel)})
		}
	},

}

