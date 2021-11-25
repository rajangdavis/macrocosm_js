import FirstRow from './first_row'
import ModalOpenButton from '../../modal_open_button'
import {useState, useEffect, useContext} from 'react'
import hedraInitialState from './initial_state'
import MerisHedraPresets from '../factory_presets/meris_hedra'
import merisStateReducer from '../../../hooks/meris_state'
import {MidiConfigContext} from '../../../hooks/midi_config'
import useLocalStorage from '../../../hooks/use_local_storage'
import sysexKnobsUpdate from '../../../hooks/sysex_knobs_update'
import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisHedraLayout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.hedraChannel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('hedra_state', hedraInitialState)
	const [hedraState, hedraDispatch] = merisStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});
	const [presetsState, setPresetsState] = useLocalStorage('hedra_presets', MerisHedraPresets)

  let {
		expressionVal,
		selectedPreset
  } = props;

  let presetsButtonClass = ()=>{
		if(noOutput){
			return "presets-button crosshatch"
		}else{
			return presetsOpen ? "presets-button open" : "presets-button"
		}
	}

	useEffect(()=>{
	  setState(hedraState)
  }, [hedraState, setState]);

  useEffect(()=>{
	  setPresetsState(MerisHedraPresets)
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
      sysexKnobsUpdate({data: presetValWithExpression.slice(5,22), dispatch: hedraDispatch, expression: true})
    }
  }

	return(
		<div>
			<div className="meris-pedal meris-hedra-bigbox">
				<FirstRow
					midiData={midiData}
	        midiObject={props.midiObject}
	        hedraState={hedraState}
	        hedraDispatch={hedraDispatch}
	       />
			</div>
		</div>
	)
}