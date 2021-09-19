import {LittleKnob} from '../knob'
import TapButton from '../tap_button'
import Bypass from '../bypass'


export default function ThirdRow(props){
	let {
		14:bypass,
		15:tempo,
		22:step1,
		23:step2,
		24:step3,
		25:step4,
		26:step5,
		27:step6
	} = props.ottobitJrState;

	let setStep1 = (value) =>{
		props.ottobitJrDispatch({key: 22, value: value})
	}
	let setStep2 = (value) =>{
		props.ottobitJrDispatch({key: 23, value: value})
	}
	let setStep3 = (value) =>{
		props.ottobitJrDispatch({key: 24, value: value})
	}
	let setStep4 = (value) =>{
		props.ottobitJrDispatch({key: 25, value: value})
	}
	let setStep5 = (value) =>{
		props.ottobitJrDispatch({key: 26, value: value})
	}
	let setStep6 = (value) =>{
		props.ottobitJrDispatch({key: 27, value: value})
	}

	return(
		<div className="flex-row">
			<div className="left-side-controls">
				<div className="flex-row tap">
					<TapButton tempo={tempo} midiData={props.midiData} midiObject={props.midiObject}/>
				</div>
			</div>
			<div className="flex-row middle-controls">
				<LittleKnob
					className="step"
					label="step 1"
					setVal={setStep1}
					val={step1}/>
				<LittleKnob
					className="step"
					label="step 2"
					setVal={setStep2}
					val={step2}/>
				<LittleKnob
					className="step"
					label="step 3"
					setVal={setStep3}
					val={step3}/>
				<LittleKnob
					className="step"
					label="step 4"
					setVal={setStep4}
					val={step4}/>
				<LittleKnob
					className="step"
					label="step 5"
					setVal={setStep5}
					val={step5}/>
				<LittleKnob
					className="step"
					label="step 6"
					setVal={setStep6}
					val={step6}/>
			</div>
			<div className="right-side-controls">
				<Bypass bypass={bypass} dispatch={props.ottobitJrDispatch}/>
			</div>
		</div>
	)
}