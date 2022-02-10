import FirstRow from './first_row'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import ModalOpenButton from '../../modal_open_button'
import {useState, useEffect, useContext} from 'react'
import polymoonInitialState from './initial_state'
import MerisPolymoonPresets from '../../../factory_presets/meris_polymoon'
import merisStateReducer from '../../../hooks/meris_state'
import {MidiConfigContext} from '../../../hooks/midi_config'
import useLocalStorage from '../../../hooks/use_local_storage'
import sysexKnobsUpdate from '../../../hooks/sysex_knobs_update'
import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisPolymoonLayout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.polymoonChannel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('polymoon_state', polymoonInitialState)
	const [polymoonState, polymoonDispatch] = merisStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});
	const [presetsState, setPresetsState] = useLocalStorage('polymoon_presets', MerisPolymoonPresets)

  let {
		expressionVal,
		selectedPreset
  } = props;

	useEffect(()=>{
	  setState(polymoonState)
  }, [polymoonState, setState]);

	useEffect(()=>{
	  setPresetsState(MerisPolymoonPresets)
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
      sysexKnobsUpdate({data: presetValWithExpression.slice(5,22), dispatch: polymoonDispatch, expression: true})
    }
  }

	return(
		<div>
			<div className="meris-pedal meris-polymoon-bigbox">
				<FirstRow
	        midiObject={props.midiObject}
	        polymoonState={polymoonState}
	        polymoonDispatch={polymoonDispatch}
	       />
				<SecondRow
	        midiObject={props.midiObject}
	        polymoonState={polymoonState}
	        polymoonDispatch={polymoonDispatch}
	       />
				<ThirdRow
	        midiObject={props.midiObject}
	        midiData={midiData}
	        polymoonState={polymoonState}
	        polymoonDispatch={polymoonDispatch}
	       />
			</div>
		</div>
	)
}