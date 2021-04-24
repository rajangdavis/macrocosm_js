import {LittleKnob} from '../knob'
import WaveShape from './wave_shape'
import FilterType from './filter_type'
import TapButton from '../tap_button'
import EnvelopeType from './envelope_type'
import SynthMode from './synth_mode'
import Bypass from '../bypass'
import {useState} from 'react'

export default function ThirdRow(props){
	const [filterBandwidth, setFilterBandwidth] = useState(0);
	return(
		<div className="flex-row">
			<div className="left-side-controls">
				<div className="flex-row first-row">
					<WaveShape />
					<FilterType />
				</div>
				<div className="flex-row tap">
					<TapButton />
				</div>
			</div>
			<div className="flex-row middle-controls">
				<LittleKnob
					className="filter-bandwidth"
					label="Filter Bandwidth" 
					setVal={setFilterBandwidth} 
					val={filterBandwidth} 
					sliderOpacity={props.sliderOpacity}/>
			</div>
			<div className="right-side-controls">
				<div className="flex-row first-row">
					<EnvelopeType />
					<SynthMode />
				</div>
				<Bypass />
			</div>
		</div>
	)
}