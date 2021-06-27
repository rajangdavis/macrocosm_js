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
import sysexKnobsUpdate from '../../../hooks/sysex_knobs_update'
import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisEnzoLayout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.enzoChannel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('enzo_state', enzoInitialState)
	const [enzoState, enzoDispatch] = merisStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});
	const [presetsOpen, setPresetsOpen] = useState(false)
	const [selectedPreset, setSelectedPreset] = useState({label: null, message: null});
  let noOutput = midiConfig.output == ""
  let {
		expressionVal,
		setExpressionVal
  } = props;

  let presetsButtonClass = ()=>{
		if(noOutput){
			return "presets-button crosshatch"
		}else{
			return presetsOpen ? "presets-button open" : "presets-button"
		}
	}

	useEffect(()=>{
	  setState(enzoState)
  }, [enzoState, setState]);

	useEffect(()=>{
    if(selectedPreset.label != null){
      applyExpression()
    }
  }, [expressionVal, applyExpression]);

  useEffect(()=>{
    if(selectedPreset.label != null){
      setExpressionVal(0)
    }
  }, [selectedPreset, setExpressionVal]);

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
      sysexKnobsUpdate({data: presetValWithExpression, dispatch: enzoDispatch, expression: true})
    }
  }

	return(
		<div className="main-display">
			<button disabled={noOutput} className={presetsButtonClass()} onClick={()=>setPresetsOpen(!presetsOpen)}>PRESETS/SETTINGS</button>
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
					selectedPedal={props.selectedPedal}
					dispatch={enzoDispatch}
					expressionVal={props.expressionVal}
					sysexByte={3}
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