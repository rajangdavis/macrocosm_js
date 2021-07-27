import {LittleKnob, BigKnob} from '../knob'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import TapButton from '../tap_button'
import HalfspeedEnable from './halfspeed_enable'
import VolumeSwellEnable from './volume_swell_enable'
import PitchControlSmoothing from './pitch_control_smoothing'
import ScaleType from './scale_type'
export default function FirstRow(props){
	
	let {
		15:tempo,
		9:halfspeedEnable,
		31:volumeSwellEnable,
		22:scaleType,
		16:key,
		17:microTune,
		18:mix,
		24:delayFeedback,
		30:pitchControlSmoothing,
	} = props.hedraState;
	
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
		props.hedraDispatch({key: 24, value: value})
	}

	return(
		<div className="flex-row first-row">
			<div>
				<ScaleType scaleType={scaleType} hedraDispatch={props.hedraDispatch}/>
				<PitchControlSmoothing
					pitchControlSmoothing={pitchControlSmoothing}
					dispatch={props.hedraDispatch}/>
				<div className="flex-row first-row">
					<HalfspeedEnable halfspeedEnable={halfspeedEnable} dispatch={props.hedraDispatch}/>
					<VolumeSwellEnable volumeSwellEnable={volumeSwellEnable} dispatch={props.hedraDispatch}/>
				</div>
				<div className="flex-row tap">
					<TapButton tempo={tempo} midiData={props.midiData} midiObject={props.midiObject}/>
				</div>
			</div>
			<div className="flex-columns">
				<div className="flex-row">
					<BigKnob
						className="top-row key"
						label="Key"
						setVal={setKey}
						val={key}
						sliderData={props.sliderData}
						/>
					<LittleKnob
						className="top-row micro-tune"
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
				<SecondRow
					sliderData={props.sliderData}
	        midiObject={props.midiObject}
	        hedraState={props.hedraState}
	        hedraDispatch={props.hedraDispatch}
	       />
	       <ThirdRow
					sliderData={props.sliderData}
	        midiObject={props.midiObject}
	        midiData={props.midiData}
	        hedraState={props.hedraState}
	        hedraDispatch={props.hedraDispatch}
	       />
			</div>
		</div>
	)
}