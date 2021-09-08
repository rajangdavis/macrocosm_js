import {LittleKnob, BigKnob} from '../knob'
import SequencerType from './sequencer_type'

export default function FirstRow(props){
	
	let {16:sampleRate, 17:filter, 18:bits, 28:sequencerType} = props.ottobitJrState;
	
	let setSampleRate = (value) =>{
		props.ottobitJrDispatch({key: 16, value: value})
	}
	let setFilter = (value) =>{
		props.ottobitJrDispatch({key: 17, value: value})
	}
	let setBits = (value) =>{
		props.ottobitJrDispatch({key: 18, value: value})
	}

	return(
		<div className="flex-row">
			<BigKnob
				className="top-row sample-rate"
				label="Sample Rate"
				setVal={setSampleRate}
				val={sampleRate}
				sliderData={props.sliderData}
				/>
			<LittleKnob
				className="top-row filter"
				label="Filter"
				setVal={setFilter}
				val={filter}
				sliderData={props.sliderData}
				/>
			<BigKnob
				className="top-row bits"
				label="bits"
				setVal={setBits}
				val={bits}
				sliderData={props.sliderData}
				/>
			<SequencerType sequencerType={sequencerType} ottobitJrDispatch={props.ottobitJrDispatch}/>
		</div>
	)
}