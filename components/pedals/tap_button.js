import {BigPadButton} from './pad_button'

export default function TapButton(props){

	const tap = ()=>{
		let {midiObject, midiData} = props;
		if(midiObject && midiData.output && midiData.channel){
			let deviceOutput = props.midiObject.outputs.filter(x =>{
				return x.name == props.midiData.output
			})[0]
			console.log(28, 127, {channels: parseInt(props.midiData.channel)})
			deviceOutput.sendControlChange(28, 127, {channels: parseInt(props.midiData.channel)})
		}
	}

	return(
		<BigPadButton onClick={tap} className="tap-button" bigButtonlabel="Tap"/>
	)
}