import {LittleKnob, BigKnob} from '../knob'
export default function FirstRow(props){
	
	let {22:earlyModulations, 16:time, 17:feedback, 18:mix, 24:delayLevel} = props.polymoonState;
	
	let setEarlyModulations = (value) =>{ 
		props.polymoonDispatch({key: 22, value: value})
	}
	let setTime = (value) =>{
		props.polymoonDispatch({key: 16, value: value})
	}
	let setFeedback = (value) =>{
		props.polymoonDispatch({key: 17, value: value})
	}
	let setMix = (value) =>{
		props.polymoonDispatch({key: 18, value: value})
	}
	let setDelayLevel = (value) =>{
		props.polymoonDispatch({key: 24, value: value})
	}

	return(
		<div className="flex-row">
			<BigKnob
				className="top-row early-modulations"
				label="Early Modulations"
				setVal={setEarlyModulations}
				val={earlyModulations}/>
			<BigKnob
				className="top-row time"
				label="Time"
				setVal={setTime}
				val={time}/>
			<LittleKnob
				className="top-row feedback"
				label="Feedback"
				setVal={setFeedback}
				val={feedback}/>
			<BigKnob
				className="top-row mix"
				label="Mix"
				setVal={setMix}
				val={mix}/>
			<BigKnob
				className="top-row delay-level"
				label="Delay Level"
				setVal={setDelayLevel}
				val={delayLevel}/>
		</div>
	)
}