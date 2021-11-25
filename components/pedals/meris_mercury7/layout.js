import FirstRow from './first_row'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import ModalOpenButton from '../../modal_open_button'
import {useState, useEffect, useContext} from 'react'
import mercury7InitialState from './initial_state'
import MerisMercury7Presets from '../factory_presets/meris_mercury_7'
import merisStateReducer from '../../../hooks/meris_state'
import {MidiConfigContext} from '../../../hooks/midi_config'
import useLocalStorage from '../../../hooks/use_local_storage'
import sysexKnobsUpdate from '../../../hooks/sysex_knobs_update'
import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisMercury7Layout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.mercury7Channel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('mercury7_state', mercury7InitialState)
	const [mercury7State, mercury7Dispatch] = merisStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});

	const [presetsState, setPresetsState] = useLocalStorage('mercury7_presets', MerisMercury7Presets)

  let {
		expressionVal,
		selectedPreset
  } = props;

	useEffect(()=>{
	  setState(mercury7State)
  }, [mercury7State, setState]);

	useEffect(()=>{
	  setPresetsState(MerisMercury7Presets)
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
      sysexKnobsUpdate({data: presetValWithExpression.slice(5,22), dispatch: mercury7Dispatch, expression: true})
    }
  }

	return(
		<div>
			<div className="meris-pedal meris-mercury7-bigbox">
				<FirstRow
	        midiObject={props.midiObject}
	        mercury7State={mercury7State}
	        mercury7Dispatch={mercury7Dispatch}
	       />
				<SecondRow
	        midiObject={props.midiObject}
	        mercury7State={mercury7State}
	        mercury7Dispatch={mercury7Dispatch}
	       />
				<ThirdRow
	        midiObject={props.midiObject}
	        midiData={midiData}
	        mercury7State={mercury7State}
	        mercury7Dispatch={mercury7Dispatch}
	       />
			</div>
		</div>
	)
}