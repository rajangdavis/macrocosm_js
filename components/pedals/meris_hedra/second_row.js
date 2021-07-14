import {LittleKnob} from '../knob'
import PitchControlSmoothing from './pitch_control_smoothing'

export default function SecondRow(props){
	let {
		30:pitchControlSmoothing,
		25:pitch1,
		26:pitch2,
		27:pitch3,
		23:pitchCorrectionAndGlide
	} = props.hedraState;
	
	let setPitch1 = (value) =>{ 
		props.hedraDispatch({key: 25, value: value})
	}
	let setPitch2 = (value) =>{ 
		props.hedraDispatch({key: 26, value: value})
	}
	let setPitch3 = (value) =>{ 
		props.hedraDispatch({key: 27, value: value})
	}
	let setPitchCorrectionAndGlide = (value) =>{ 
		props.hedraDispatch({key: 23, value: value})
	}

	
	return(
		<div className="flex-row">
			<PitchControlSmoothing 
				pitchControlSmoothing={pitchControlSmoothing} 
				dispatch={props.hedraDispatch}/>
			<LittleKnob 
				className="middle-row pitch1"
				label="Pitch 1"
				setVal={setPitch1}
				val={pitch1}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row pitch2"
				label="Pitch 2"
				setVal={setPitch2}
				val={pitch2}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row pitch3"
				label="Pitch 3"
				setVal={setPitch3}
				val={pitch3}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row delay-feedback"
				label="Pitch Correction + Glide"
				setVal={setPitchCorrectionAndGlide}
				val={pitchCorrectionAndGlide}
				sliderData={props.sliderData}/>
		</div>
	)
}
