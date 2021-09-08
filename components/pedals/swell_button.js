import {BigPadButton} from './pad_button'

export default function SwellButton(props){

	let {midiObject, midiData} = props;
	const release = (e)=>{
		if(midiObject && midiData.output && midiData.channel){
			let deviceOutput = props.midiObject.outputs.filter(x =>{
				return x.name == props.midiData.output
			})[0]
			console.log(28, 0, {channels: parseInt(props.midiData.channel)})
			deviceOutput.sendControlChange(28, 127, {channels: parseInt(props.midiData.channel)})
		}
	}

	const hold = (e)=>{
		if(midiObject && midiData.output && midiData.channel){
			let deviceOutput = props.midiObject.outputs.filter(x =>{
				return x.name == props.midiData.output
			})[0]
			console.log(28, 127, {channels: parseInt(props.midiData.channel)})
			deviceOutput.sendControlChange(28, 127, {channels: parseInt(props.midiData.channel)})
		}
	}

	return(
		<div className="tap-button-container">
			<BigPadButton onClick={release} onMouseDown={hold} className="tap-button" bigButtonlabel="Swell"/>
		</div>
	)
}