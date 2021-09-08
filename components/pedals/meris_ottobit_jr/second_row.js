import {LittleKnob} from '../knob'

export default function SecondRow(props){
	let {19:stutter, 20:sequencer, 21:sequencerMult} = props.ottobitJrState;

	let setStutter = (value) =>{
		props.ottobitJrDispatch({key: 19, value: value})
	}
	let setSequencer = (value) =>{
		props.ottobitJrDispatch({key: 20, value: value})
	}
	let setSequencerMult = (value) =>{
		props.ottobitJrDispatch({key: 21, value: value})
	}
	
	return(
		<div className="flex-row">
			<LittleKnob
				className="middle-row stutter"
				label="Stutter"
				setVal={setStutter}
				val={stutter}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row sequencer"
				label="Sequencer"
				setVal={setSequencer}
				val={sequencer}
				sliderData={props.sliderData}/>
			<LittleKnob
				className="middle-row sequencer-mult"
				label="sequencer mult"
				setVal={setSequencerMult}
				val={sequencerMult}
				sliderData={props.sliderData}/>
		</div>
	)
}