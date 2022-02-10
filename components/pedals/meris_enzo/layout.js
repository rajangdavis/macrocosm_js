import FirstRow from './first_row'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import ModalOpenButton from '../../modal_open_button'
import {useState, useEffect, useContext} from 'react'
import enzoInitialState from './initial_state'
import MerisEnzoPresets from '../../../factory_presets/meris_enzo'
import merisStateReducer from '../../../hooks/meris_state'
import {MidiConfigContext} from '../../../hooks/midi_config'
import useLocalStorage from '../../../hooks/use_local_storage'
import sysexKnobsUpdate from '../../../hooks/sysex_knobs_update'
import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisEnzoLayout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.enzoChannel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('enzo_state', enzoInitialState)
	const [enzoState, enzoDispatch] = merisStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});

	const [presetsState, setPresetsState] = useLocalStorage('enzo_presets', MerisEnzoPresets)

  let {
		expressionVal,
		selectedPreset
  } = props;

	useEffect(()=>{
	  setState(enzoState)
  }, [enzoState, setState]);

	useEffect(()=>{
	  setPresetsState(MerisEnzoPresets)
  }, [presetsState, setPresetsState]);

	useEffect(()=>{
    if(selectedPreset.label != null){
      applyExpression()
    }
  }, [expressionVal, applyExpression, selectedPreset]);

  const applyExpression = ()=>{
    if(props.midiObject && midiData.output && midiData.channel){
      let {manufacturer, data} = parseSysexToBinary(selectedPreset.message)
      let deviceOutput = props.midiObject.outputs.filter(x =>{
        return x.name == midiData.output
      })[0]
      let presetValWithExpression = data.map((_, i)=>{
        if(i < 5){
          return 0;
        }else{
          let x = data[i];
          let y = data[i + 17];
          return Math.floor(props.expressionVal*((y - x)/128)) + x
        }
      })
      sysexKnobsUpdate({data: presetValWithExpression.slice(5,22), dispatch: enzoDispatch, expression: true})
    }
  }

	return(
		<div>
			<div className="meris-pedal meris-enzo-bigbox">
				<FirstRow
	        midiObject={props.midiObject}
	        enzoState={enzoState}
	        enzoDispatch={enzoDispatch}
	       />
				<SecondRow
	        midiObject={props.midiObject}
	        enzoState={enzoState}
	        enzoDispatch={enzoDispatch}
	       />
				<ThirdRow
	        midiObject={props.midiObject}
	        midiData={midiData}
	        enzoState={enzoState}
	        enzoDispatch={enzoDispatch}
	       />
			</div>
		</div>
	)
}