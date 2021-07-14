import {LittleKnob, BigKnob} from '../knob'
import ScaleType from './scale_type'
export default function FirstRow(props){
	
	let {22:scaleType, 16:key, 17:microTune, 18:mix, 19:delayFeedback} = props.hedraState;
	
	let setScaleType = (value) =>{ 
		props.hedraDispatch({key: 22, value: value})
	}
	let setKey = (value) =>{
		props.hedraDispatch({key: 16, value: value})
	}
	let setmicroTune = (value) =>{
		props.hedraDispatch({key: 17, value: value})
	}
	let setMix = (value) =>{
		props.hedraDispatch({key: 18, value: value})
	}
	let setDelayFeedback = (value) =>{
		props.hedraDispatch({key: 19, value: value})
	}

	return(
		<div className="flex-row">
			<ScaleType scaleType={scaleType} hedraDispatch={props.hedraDispatch}/>
			<BigKnob
				className="top-row key"
				label="Key"
				setVal={setKey}
				val={key}
				sliderData={props.sliderData}
				/>
			<LittleKnob
				className="top-row microTune"
				label="Micro Tune"
				setVal={setmicroTune}
				val={microTune}
				sliderData={props.sliderData}
				/>
			<BigKnob
				className="top-row mix"
				label="Mix"
				setVal={setMix}
				val={mix}
				sliderData={props.sliderData}
				/>
			<BigKnob
				className="top-row delay-level"
				label="Delay Feedback"
				setVal={setDelayFeedback}
				val={delayFeedback}
				sliderData={props.sliderData}
				/>
		</div>
	)
}