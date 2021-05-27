import FirstRow from './first_row'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import {useState, useEffect, useContext} from 'react'
import enzoInitialState from './initial_state'
import enzoStateReducer from '../../../../hooks/enzo_state'
import {MidiConfigContext} from '../../../../hooks/midi_config'
import useLocalStorage from '../../../../hooks/use_local_storage'

export default function MerisEnzoLayout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.enzoChannel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('enzo_state', enzoInitialState)
	const [enzoState, enzoDispatch] = enzoStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});

	useEffect(()=>{
	  setState(enzoState)
  }, [props.midiObject]);

	return(
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
        enzoState={enzoState}
        enzoDispatch={enzoDispatch}
       />
		</div>
	)
}