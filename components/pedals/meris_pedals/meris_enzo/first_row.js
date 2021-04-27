import {LittleKnob, BigKnob} from '../knob'
export default function FirstRow(props){
	
	let {portamento, pitch, filter, mix, delayLevel} = props.enzoState;
	
	let setPortamento = (value) =>{ 
		props.enzoDispatch({key: 'portamento', value: value})
	}
	let setPitch = (value) =>{
		props.enzoDispatch({key: 'pitch', value: value})
	}
	let setFilter = (value) =>{
		props.enzoDispatch({key: 'filter', value: value})
	}
	let setMix = (value) =>{
		props.enzoDispatch({key: 'mix', value: value})
	}
	let setDelayLevel = (value) =>{
		props.enzoDispatch({key: 'delayLevel', value: value})
	}

	return(
		<div className="flex-row">
			<BigKnob
				className="top-row portamento"
				label="Portamento"
				setVal={setPortamento}
				val={portamento.value}
				sliderOpacity={props.sliderOpacity}/>
			<BigKnob
				className="top-row pitch"
				label="Pitch"
				setVal={setPitch}
				val={pitch.value}
				sliderOpacity={props.sliderOpacity}/>
			<LittleKnob
				className="top-row filter"
				label="Filter"
				setVal={setFilter}
				val={filter.value}
				sliderOpacity={props.sliderOpacity}/>
			<BigKnob
				className="top-row mix"
				label="Mix"
				setVal={setMix}
				val={mix.value}
				sliderOpacity={props.sliderOpacity}/>
			<BigKnob
				className="top-row delay-level"
				label="Delay Level"
				setVal={setDelayLevel}
				val={delayLevel.value}
				sliderOpacity={props.sliderOpacity}/>
		</div>
	)
}