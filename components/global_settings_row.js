import MerisGlobalSettings from "./pedals/meris_global_settings"
import parseSysexToBinary from '../utilities/parse_sysex'
import {useContext} from 'react'
import {MidiConfigContext} from '../hooks/midi_config'


export default function GlobalSettingsRow(props){
  const {midiConfig} = useContext(MidiConfigContext)
  let isSelected = (thisVal)=>{
    return props.state == thisVal;
  }

  let selected = (thisVal)=>{
    return isSelected(thisVal) ? 'selected' : '';
  }

  let sendMessage = (thisVal, val) =>{
    let {sysexByte, settingNumber, midiObject} = props;
    if(midiObject && midiConfig.output != ""){
      let sysexString = MerisGlobalSettings(sysexByte, settingNumber, val)
      let {manufacturer, data} = parseSysexToBinary(sysexString)
      let deviceOutput = midiObject.outputs.filter(x =>{
        return x.name == midiConfig.output
      })[0]
      deviceOutput.sendSysex(manufacturer, data);
    }
    props.setState(thisVal)
  }

  return(
		<tr>
      <td className="title">{props.title}</td>
      <td 
        className={selected(props.option1)}
        onClick={()=> sendMessage(props.option1, 0)}
        >{props.option1}</td>
      <td 
        className={selected(props.option2)}
        onClick={()=> sendMessage(props.option2, 1)}
        >{props.option2}</td>
    </tr>
	)
}