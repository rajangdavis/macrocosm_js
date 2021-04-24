import {LittleKnob} from '../knob'
import TapButton from '../tap_button'
import Bypass from '../bypass'
import SynthMode from './synth_mode'
import WaveShape from './wave_shape'
import EnvelopeType from './envelope_type'
import FilterType from './filter_type'
import {useState} from 'react'

export default function ThirdRow(props){
	const [filterBandwidth, setFilterBandwidth] = useState(1);
	return(
		<div className="flex-row">
			<div className="left-side-controls">
				<div className="flex-row first-row">
					<WaveShape />
					<FilterType />
				</div>
				<TapButton />
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