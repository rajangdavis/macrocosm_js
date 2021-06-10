import FirstRow from './first_row'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import {useState, useEffect, useContext} from 'react'
import enzoInitialState from './initial_state'
import merisStateReducer from '../../../hooks/meris_state'
import {MidiConfigContext} from '../../../hooks/midi_config'
import useLocalStorage from '../../../hooks/use_local_storage'
import MerisEnzoPresets from '../factory_presets/meris_enzo'
import PresetsModal from '../../presets_modal'


export default function MerisEnzoLayout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.enzoChannel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('enzo_state', enzoInitialState)
	const [enzoState, enzoDispatch] = merisStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});
	const [presetsOpen, setPresetsOpen] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(null);
  let presetsButtonClass = presetsOpen ? "presets-button open" : "presets-button"

	useEffect(()=>{
	  setState(enzoState)
  }, [enzoState]);

	return(
		<div className="main-display">
			<button className={presetsButtonClass} onClick={()=>setPresetsOpen(!presetsOpen)}>PRESETS/SETTINGS</button>
			<div className="meris-pedal meris-enzo-bigbox">
				<FirstRow
					sliderData={props.sliderData}
	        midiObject={props.midiObject}
	        enzoState={enzoState}
	        enzoDispatch={enzoDispatch}
	       />
				<SecondRow
					sliderData={props.sliderData}
	        midiObject={props.midiObject}
	        enzoState={enzoState}
	        enzoDispatch={enzoDispatch}
	       />
				<ThirdRow
					sliderData={props.sliderData}
	        midiObject={props.midiObject}
	        midiData={midiData}
	        enzoState={enzoState}
	        enzoDispatch={enzoDispatch}
	       />
			</div>
			{
        presetsOpen &&
        <PresetsModal
					enzoDispatch={enzoDispatch}
          midiObject={props.midiObject}
          setPresetsOpen={setPresetsOpen}
          presets={MerisEnzoPresets}
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
        />
      }
		</div>
	)
}