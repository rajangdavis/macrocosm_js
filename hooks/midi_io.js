module.exports = {
	HandleMidiOutput: (state, action, props = {})=>{
		console.log("HANDLING OUTPUT")
		let {midiObject, midiData} = props;
		console.log(midiObject)
		console.log(midiData)
		if(midiObject && midiData.output && midiData.channel){
			console.log("WHY IS THIS NOT WORKING")
			let ccValue = state[action.key].ccValue;
			let deviceOutput = midiObject.outputs.filter(x =>{
				return x.name == midiData.output
			})[0]
			console.log(ccValue, action.value, {channels: midiData.channel})
			deviceOutput.sendControlChange(ccValue, action.value, {channels: parseInt(midiData.channel)})
		}
	},

	HandleMidiInput: (props = {})=>{
		if(props.midiObject && props.midiData){
			let {midiObject, midiChannel, midiInput} = props;
			let deviceInput = midiObject.outputs.filter(x =>{
				return x.name == midiInput
			})[0]
			// console.log(ccValue, action.value, {channels: midiChannel})
			// deviceOutput.sendControlChange(ccValue, action.value, {channels: parseInt(midiChannel)})
		}
	},

}

