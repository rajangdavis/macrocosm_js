import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisPresets(props){

	let presetVals = Array(17).fill().map((_, i) => i + 1)
	let groupedPresets = []
	var tempArr = []
	
	presetVals.map(x =>{
		if(((x-4)%4 == 1) || (x == Math.max(...presetVals))){
			groupedPresets.push(tempArr);
			tempArr = []
		}
		tempArr.push(x)
	})

	let scopeListener = (updateOnListen)=>{
		props.dispatch({
			type: 'update-pedal',
			field: 'can_listen',
			new_value: updateOnListen,
			midi_device_id:	props.midi_device_id,
			macro_id: props.macro_id,
			pedal_id: props.pedal_id
		})
	}

	let updateListener = (command, callback)=>{
		let {data, manufacturer} = parseSysexToBinary(command);
		props.deviceOutput.sendSysex(manufacturer, data);
		setTimeout(callback, 500);
	}

	let sendSysex = (command) =>{
		scopeListener(true);
		updateListener(command, ()=> scopeListener(false))
	}

	return (<div className="preset-groups-container">
      <div className={`preset-groups ${props.isActive()}`}>
        {props.factoryPresets.map((fp, i) =>{
    			return <button key={i} onClick={()=> sendSysex(fp.message)}>{fp.label}</button>
    		})}
      </div>
      <span onClick={()=> props.showOrHidePresets()}>{props.showOrHidePresetsLabel()}</span>
    </div>)

}