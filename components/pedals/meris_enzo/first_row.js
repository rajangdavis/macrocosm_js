import {LittleKnob, BigKnob} from '../knob'
export default function FirstRow(props){
	
	let {22:portamento, 16:pitch, 17:filter, 18:mix, 24:delayLevel} = props.enzoState;
	
	let setPortamento = (value) =>{ 
		props.enzoDispatch({key: 22, value: value})
	}
	let setPitch = (value) =>{
		props.enzoDispatch({key: 16, value: value})
	}
	let setFilter = (value) =>{
		props.enzoDispatch({key: 17, value: value})
	}
	let setMix = (value) =>{
		props.enzoDispatch({key: 18, value: value})
	}
	let setDelayLevel = (value) =>{
		props.enzoDispatch({key: 24, value: value})
	}

	return(
		<div className="flex-row">
			<BigKnob
				className="top-row portamento"
				label="Portamento"
				setVal={setPortamento}
				val={portamento}
				sliderData={props.sliderData}
				/>
			<BigKnob
				className="top-row pitch"
				label="Pitch"
				setVal={setPitch}
				val={pitch}
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
				className="top-row mix"
				label="Mix"
				setVal={setMix}
				val={mix}
				sliderData={props.sliderData}
				/>
			<BigKnob
				className="top-row delay-level"
				label="Delay Level"
				setVal={setDelayLevel}
				val={delayLevel}
				sliderData={props.sliderData}
				/>
		</div>
	)
}