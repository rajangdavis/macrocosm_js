import {LittleKnob} from '../knob'
import {useState} from 'react'

export default function SecondRow(props){
	const [ringModulation, setRingModulation] = useState(0);
	const [sustain, setSustain] = useState(0);
	const [filterEnv, setFilterEnv] = useState(0);
	const [modulation, setModulation] = useState(0);
	const [delayFeedback, setDelayFeedback] = useState(0);
	return(
		<div className="flex-row">
			<LittleKnob 
				className="middle-row ring-modulation" 
				label="Ring Modulation"
				setVal={setRingModulation} 
				val={ringModulation} 
				sliderOpacity={props.sliderOpacity}/>
			<LittleKnob 
				className="middle-row sustain" 
				label="Sustain"
				setVal={setSustain} 
				val={sustain} 
				sliderOpacity={props.sliderOpacity}/>
			<LittleKnob 
				className="middle-row filter-env" 
				label="Filter Env"
				setVal={setFilterEnv} 
				val={filterEnv} 
				sliderOpacity={props.sliderOpacity}/>
			<LittleKnob 
				className="middle-row modulation" 
				label="Modulation"
				setVal={setModulation} 
				val={modulation} 
				sliderOpacity={props.sliderOpacity}/>
			<LittleKnob 
				className="middle-row delay-feedback" 
				label="Delay Feedback"
				setVal={setDelayFeedback} 
				val={delayFeedback} 
				sliderOpacity={props.sliderOpacity}/>
		</div>
	)
}