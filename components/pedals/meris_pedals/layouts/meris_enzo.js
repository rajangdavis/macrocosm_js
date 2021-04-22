import BigKnob from '../big_knob'
import LittleKnob from '../little_knob'
import {SmallPadButton, BigPadButton, WidePadButton} from '../pad_button'
import {useState} from 'react'

export default function MerisEnzoLayout(props){
	const [portaMento, setPortamento] = useState(1);
	const [pitch, setPitch] = useState(1);
	const [filter, setFilter] = useState(1);
	const [mix, setMix] = useState(1);
	const [delayLevel, setDelayLevel] = useState(1);
	const [ringModulation, setRingModulation] = useState(1);
	const [sustain, setSustain] = useState(1);
	const [filterEnv, setFilterEnv] = useState(1);
	const [modulation, setModulation] = useState(1);
	const [delayFeedback, setDelayFeedback] = useState(1);
	const [filterBandwidth, setFilterBandwidth] = useState(1);
	return(
		<div className="meris-pedal meris-enzo-bigbox">
			<div className="flex-row">
				<BigKnob className="top-row" label="Portamento" setVal={setPortamento} val={portaMento} sliderOpacity={props.sliderOpacity}/>
				<BigKnob className="top-row" label="Pitch" setVal={setPitch} val={pitch} sliderOpacity={props.sliderOpacity}/>
				<LittleKnob className="top-row" label="Filter" setVal={setFilter} val={filter} sliderOpacity={props.sliderOpacity}/>
				<BigKnob className="top-row" label="Mix" setVal={setMix} val={mix} sliderOpacity={props.sliderOpacity}/>
				<BigKnob className="top-row" label="Delay Level" setVal={setDelayLevel} val={delayLevel} sliderOpacity={props.sliderOpacity}/>
			</div>
			<div className="flex-row">
				<LittleKnob className="middle-row" label="Ring Modulation" setVal={setRingModulation} val={ringModulation} sliderOpacity={props.sliderOpacity}/>
				<LittleKnob className="middle-row" label="Sustain" setVal={setSustain} val={sustain} sliderOpacity={props.sliderOpacity}/>
				<LittleKnob className="middle-row" label="Filter Env" setVal={setFilterEnv} val={filterEnv} sliderOpacity={props.sliderOpacity}/>
				<LittleKnob className="middle-row" label="Modulation" setVal={setModulation} val={modulation} sliderOpacity={props.sliderOpacity}/>
				<LittleKnob className="middle-row" label="Delay Feedback" setVal={setDelayFeedback} val={delayFeedback} sliderOpacity={props.sliderOpacity}/>
			</div>
			<div className="flex-row last-row">
				<div className="hidden">
					<SmallPadButton label="On" setVal={setFilterBandwidth}/>
					<br/>
					<BigPadButton label="On" setVal={setFilterBandwidth}/>
					<br/>
					<WidePadButton label="On" setVal={setFilterBandwidth}/>
				</div>
				<LittleKnob label="Filter Bandwidth" setVal={setFilterBandwidth} val={filterBandwidth} sliderOpacity={props.sliderOpacity}/>
			</div>
		</div>
	)
}