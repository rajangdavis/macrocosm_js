import {LittleKnob} from '../knob'

export default function SecondRow(props){
	let {
		25:density,
		19:loFreq,
		20:pitchVector,
		21:hiFreq,
		27:vibratoDepth
	} = props.mercury7State;

	let setDensity = (value) =>{
		props.mercury7Dispatch({key: 25, value: value})
	}
	let setLoFrequency = (value) =>{
		props.mercury7Dispatch({key: 19, value: value})
	}
	let setPitchVector = (value) =>{
		props.mercury7Dispatch({key: 20, value: value})
	}
	let setHiFrequency = (value) =>{
		props.mercury7Dispatch({key: 21, value: value})
	}
	let setVibratoDepth = (value) =>{
		props.mercury7Dispatch({key: 27, value: value})
	}
	
	return(
		<div className="flex-row">
			<LittleKnob
				className="middle-row density"
				label="Density"
				setVal={setDensity}
				val={density}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row low-frequency"
				label="Lo Freq"
				setVal={setLoFrequency}
				val={loFreq}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row pitch-vector"
				label="pitch Vector"
				setVal={setPitchVector}
				val={pitchVector}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row high-frequency"
				label="Hi Freq"
				setVal={setHiFrequency}
				val={hiFreq}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row vibrato-depth"
				label="Vibrato Depth"
				setVal={setVibratoDepth}
				val={vibratoDepth}
				sliderData={props.sliderData}/>
		</div>
	)
}