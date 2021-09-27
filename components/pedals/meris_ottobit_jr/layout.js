import FirstRow from './first_row'
import SecondRow from './second_row'
import ThirdRow from './third_row'
import ModalOpenButton from '../../modal_open_button'
import {useState, useEffect, useContext} from 'react'
import ottobitJrInitialState from './initial_state'
import merisStateReducer from '../../../hooks/meris_state'
import {MidiConfigContext} from '../../../hooks/midi_config'
import useLocalStorage from '../../../hooks/use_local_storage'
import MerisOttobitJrPresets from '../factory_presets/meris_ottobit_jr'
import PresetsModal from '../../presets_modal'
import sysexKnobsUpdate from '../../../hooks/sysex_knobs_update'
import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisOttobitJrLayout(props){

	const {midiConfig} = useContext(MidiConfigContext)
	const midiData = {channel: midiConfig.ottobitJrChannel, output: midiConfig.output}
	const [initialState, setState] = useLocalStorage('ottobit_jr_state', ottobitJrInitialState)
	const [ottobitJrState, ottobitJrDispatch] = merisStateReducer(initialState, {midiData: midiData, midiObject: props.midiObject});
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
	  setState(ottobitJrState)
  }, [ottobitJrState, setState]);

	useEffect(()=>{
    if(selectedPreset.label != null){
      applyExpression()
    }
  }, [expressionVal, applyExpression]);

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
      sysexKnobsUpdate({data: presetValWithExpression.slice(5,22), dispatch: ottobitJrDispatch, expression: true})
    }
  }

	return(
		<div className="main-display">
			<ModalOpenButton presetsOpen={presetsOpen} setPresetsOpen={setPresetsOpen} />
			<div className="meris-pedal meris-ottobit-jr-bigbox">
				<FirstRow
	        midiObject={props.midiObject}
	        ottobitJrState={ottobitJrState}
	        ottobitJrDispatch={ottobitJrDispatch}
	       />
				<SecondRow
	        midiObject={props.midiObject}
	        ottobitJrState={ottobitJrState}
	        ottobitJrDispatch={ottobitJrDispatch}
	       />
				<ThirdRow
	        midiObject={props.midiObject}
	        midiData={midiData}
	        ottobitJrState={ottobitJrState}
	        ottobitJrDispatch={ottobitJrDispatch}
	       />
			</div>
			{
        presetsOpen &&
        <PresetsModal
					selectedPedal={props.selectedPedal}
					dispatch={ottobitJrDispatch}
					expressionVal={props.expressionVal}
					sysexByte={0}
          midiObject={props.midiObject}
          setPresetsOpen={setPresetsOpen}
          presets={MerisOttobitJrPresets}
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
        />
      }
		</div>
	)
}