import {LittleKnob, BigKnob} from '../knob'
import {useState} from 'react'

export default function FirstRow(props){
	const [portamento, setPortamento] = useState(0);
	const [pitch, setPitch] = useState(0);
	const [filter, setFilter] = useState(0);
	const [mix, setMix] = useState(0);
	const [delayLevel, setDelayLevel] = useState(0);
	return(
		<div className="flex-row">
			<BigKnob 
				className="top-row portamento"
				label="Portamento"
				setVal={setPortamento}
				val={portamento}
				sliderOpacity={props.sliderOpacity}/>
			<BigKnob 
				className="top-row pitch" 
				label="Pitch"
				setVal={setPitch} 
				val={pitch} 
				sliderOpacity={props.sliderOpacity}/>
			<LittleKnob 
				className="top-row filter" 
				label="Filter"
				setVal={setFilter} 
				val={filter} 
				sliderOpacity={props.sliderOpacity}/>
			<BigKnob 
				className="top-row mix" 
				label="Mix"
				setVal={setMix} 
				val={mix} 
				sliderOpacity={props.sliderOpacity}/>
			<BigKnob 
				className="top-row delay-level" 
				label="Delay Level"
				setVal={setDelayLevel} 
				val={delayLevel} 
				sliderOpacity={props.sliderOpacity}/>
		</div>
	)
}