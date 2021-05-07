import {LittleKnob} from '../knob'

export default function SecondRow(props){
	let {ringModulation, sustain, filterEnv, modulation, delayFeedback} = props.enzoState;

	let setRingModulation = (value) =>{ 
		props.enzoDispatch({key: 'ringModulation', value: value})
	}
	let setSustain = (value) =>{ 
		props.enzoDispatch({key: 'sustain', value: value})
	}
	let setFilterEnv = (value) =>{ 
		props.enzoDispatch({key: 'filterEnv', value: value})
	}
	let setModulation = (value) =>{ 
		props.enzoDispatch({key: 'modulation', value: value})
	}
	let setDelayFeedback = (value) =>{ 
		props.enzoDispatch({key: 'delayFeedback', value: value})
	}
	
	return(
		<div className="flex-row">
			<LittleKnob 
				className="middle-row ring-modulation" 
				label="Ring Modulation"
				setVal={setRingModulation} 
				val={ringModulation.value} 
				sliderData={props.sliderData}/>
			<LittleKnob 
				className="middle-row sustain" 
				label="Sustain"
				setVal={setSustain} 
				val={sustain.value} 
				sliderData={props.sliderData}/>
			<LittleKnob 
				className="middle-row filter-env" 
				label="Filter Env"
				setVal={setFilterEnv} 
				val={filterEnv.value} 
				sliderData={props.sliderData}/>
			<LittleKnob 
				className="middle-row modulation" 
				label="Modulation"
				setVal={setModulation} 
				val={modulation.value} 
				sliderData={props.sliderData}/>
			<LittleKnob 
				className="middle-row delay-feedback" 
				label="Delay Feedback"
				setVal={setDelayFeedback} 
				val={delayFeedback.value} 
				sliderData={props.sliderData}/>
		</div>
	)
}