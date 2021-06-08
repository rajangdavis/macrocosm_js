import {LittleKnob} from '../knob'
import WaveShape from './wave_shape'
import FilterType from './filter_type'
import TapButton from '../tap_button'
import EnvelopeType from './envelope_type'
import SynthMode from './synth_mode'
import Bypass from '../bypass'

export default function ThirdRow(props){
	let {
		filterBandwidth, 
		waveShape, 
		filterType, 
		envelopeType,
		synthMode,
		bypass
	} = props.enzoState;
	
	let setFilterBandwidth = (value) =>{ 
		props.enzoDispatch({key: 'filterBandwidth', value: value})
	}
	
	return(
		<div className="flex-row">
			<div className="left-side-controls">
				<div className="flex-row first-row">
					<WaveShape waveShape={waveShape.value} enzoDispatch={props.enzoDispatch}/>
					<FilterType filterType={filterType.value} enzoDispatch={props.enzoDispatch}/>
				</div>
				<div className="flex-row tap">
					<TapButton midiData={props.midiData} midiObject={props.midiObject}/>
				</div>
			</div>
			<div className="flex-row middle-controls">
				<LittleKnob
					className="filter-bandwidth"
					label="Filter Bandwidth" 
					setVal={setFilterBandwidth} 
					val={filterBandwidth.value} 
					sliderData={props.sliderData}/>
			</div>
			<div className="right-side-controls">
				<div className="flex-row first-row">
					<EnvelopeType envelopeType={envelopeType.value} enzoDispatch={props.enzoDispatch}/>
					<SynthMode synthMode={synthMode.value} enzoDispatch={props.enzoDispatch}/>
				</div>
				<Bypass bypass={bypass.value} enzoDispatch={props.enzoDispatch}/>
			</div>
		</div>
	)
}