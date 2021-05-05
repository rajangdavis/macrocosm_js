import parseSysexToBinary from '../../../utilities/parse_sysex'

export default function MerisPresets(props){

	let scopeListener = (canListen)=>{
		// canListen
	}

	let updateListener = (command, callback)=>{
		// let {data, manufacturer} = parseSysexToBinary(command);
		// props.deviceOutput.sendSysex(manufacturer, data);
		// setTimeout(callback, 500);
	}

	let sendSysex = (command) =>{
		scopeListener(true);
		updateListener(command, ()=> scopeListener(false))
	}

	return (
		<details className="preset-groups-container">
      <summary>
	    	{`${props.selectedPedal} Presets`.toUpperCase()}
      </summary>
      <div className="preset-groups">
      	{props.factoryPresets.map((fp, i) =>{
  				return <div key={i} onClick={()=> sendSysex(fp.message)}>{fp.label}</div>
  			})}
      </div>
    </details>
  )

}