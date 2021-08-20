import {BigPadButton} from './pad_button'

export default function SwellButton(props){

	const tap = (e)=>{
		let {midiObject, midiData} = props;
		if(midiObject && midiData.output && midiData.channel){
			let deviceOutput = props.midiObject.outputs.filter(x =>{
				return x.name == props.midiData.output
			})[0]
			console.log(28, 127, {channels: parseInt(props.midiData.channel)})
			deviceOutput.sendControlChange(28, 127, {channels: parseInt(props.midiData.channel)})
		}
	}

	const yo = (e)=>{
		console.log(e)
	}

	let tempoDotStyle = ()=> {
		let initStyle ={
			WebkitAnimation: `blink-animation ${props.tempo*10}ms steps(1, end) infinite`,
			animationDelay: "3ms"
		}
		let {midiObject, midiData} = props;
		if(midiObject && midiData.output && midiData.channel){
			return initStyle
		}else{
			return {}
		}
	}

	return(
		<div className="tap-button-container" onClickCapture={yo}	>
			<BigPadButton onClick={tap} className="tap-button" bigButtonlabel="Swell"/>
			{/*<span className="tempo-dot" style={tempoDotStyle()}></span>*/}
		</div>
	)
}