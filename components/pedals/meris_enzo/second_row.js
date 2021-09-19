import {LittleKnob} from '../knob'

export default function SecondRow(props){
	let {25:ringModulation, 19:sustain, 20:filterEnv, 21:modulation, 27:delayFeedback} = props.enzoState;

	let setRingModulation = (value) =>{
		props.enzoDispatch({key: 25, value: value})
	}
	let setSustain = (value) =>{
		props.enzoDispatch({key: 19, value: value})
	}
	let setFilterEnv = (value) =>{
		props.enzoDispatch({key: 20, value: value})
	}
	let setModulation = (value) =>{
		props.enzoDispatch({key: 21, value: value})
	}
	let setDelayFeedback = (value) =>{
		props.enzoDispatch({key: 27, value: value})
	}
	
	return(
		<div className="flex-row">
			<LittleKnob
				className="middle-row ring-modulation"
				label="Ring Modulation"
				setVal={setRingModulation}
				val={ringModulation}/>
			<LittleKnob
				className="middle-row sustain"
				label="Sustain"
				setVal={setSustain}
				val={sustain}/>
			<LittleKnob
				className="middle-row filter-env"
				label="Filter Env"
				setVal={setFilterEnv}
				val={filterEnv}/>
			<LittleKnob
				className="middle-row modulation"
				label="Modulation"
				setVal={setModulation}
				val={modulation}/>
			<LittleKnob
				className="middle-row delay-feedback"
				label="Delay Feedback"
				setVal={setDelayFeedback}
				val={delayFeedback}/>
		</div>
	)
}