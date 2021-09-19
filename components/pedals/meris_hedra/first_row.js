import {LittleKnob, BigKnob} from '../knob'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import HalfspeedEnable from './halfspeed_enable'
import PitchControlSmoothing from './pitch_control_smoothing'

export default function FirstRow(props){
	
	let {
		22:scaleType,
		16:key,
		17:microTune,
		18:mix,
		24:delayFeedback,
	} = props.hedraState;
	
	let setKey = (value) =>{
		props.hedraDispatch({key: 16, value: value})
	}
	let setmicroTune = (value) =>{
		props.hedraDispatch({key: 17, value: value})
	}
	let setMix = (value) =>{
		props.hedraDispatch({key: 18, value: value})
	}
	let setScaleType = (value)=>{
		props.hedraDispatch({key: 22, value: value})
	}
	let setDelayFeedback = (value) =>{
		props.hedraDispatch({key: 24, value: value})
	}


	return(
		<div className="flex-row">
			<div className="flex-columns">
				<div className="flex-row first-row">
					<BigKnob
						className="top-row scale-type"
						label="Scale Type"
						setVal={setScaleType}
						val={scaleType}
					/>
					<BigKnob
						className="top-row key"
						label="Key"
						setVal={setKey}
						val={key}
						/>
					<LittleKnob
						className="top-row micro-tune"
						label="Micro Tune"
						setVal={setmicroTune}
						val={microTune}
						/>
					<BigKnob
						className="top-row mix"
						label="Mix"
						setVal={setMix}
						val={mix}
						/>
					<BigKnob
						className="top-row delay-level"
						label="Delay Feedback"
						setVal={setDelayFeedback}
						val={delayFeedback}
						/>
				</div>
				<SecondRow
	        midiObject={props.midiObject}
	        hedraState={props.hedraState}
	        hedraDispatch={props.hedraDispatch}
	       />
	       <ThirdRow
	        midiObject={props.midiObject}
	        midiData={props.midiData}
	        hedraState={props.hedraState}
	        hedraDispatch={props.hedraDispatch}
	       />
			</div>
		</div>
	)
}