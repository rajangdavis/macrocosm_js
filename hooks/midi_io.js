module.exports = {
	HandleMidiOutput: (state, action, props = {})=>{
		let {midiObject, midiData} = props;
		if(midiObject && midiData.output && midiData.channel){
			let ccValue = state[action.key].ccValue;
			let deviceOutput = midiObject.outputs.filter(x =>{
				return x.name == midiData.output
			})[0]
			console.log(ccValue, action.value, {channels: midiData.channel})
			deviceOutput.sendControlChange(ccValue, action.value, {channels: parseInt(midiData.channel)})
		}
	},

	HandleMidiInput: (props = {})=>{
		let {midiObject, midiData} = props;
		if(midiObject && midiData.input && midiData.channel){
			let deviceInput = midiObject.inputs.filter(x =>{
				return x.name == midiInput
			})[0]
			// console.log(ccValue, action.value, {channels: midiChannel})
			// deviceOutput.sendControlChange(ccValue, action.value, {channels: parseInt(midiChannel)})
		}
	},

}

