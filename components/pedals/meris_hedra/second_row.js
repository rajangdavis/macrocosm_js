import {LittleKnob} from '../knob'

export default function SecondRow(props){
	let {
		19:pitch1,
		20:pitch2,
		21:pitch3,
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
				label="Pitch Correction and Glide"
				setVal={setPitchCorrectionAndGlide}
				val={pitchCorrectionAndGlide}
				sliderData={props.sliderData}/>
		</div>
	)
}
