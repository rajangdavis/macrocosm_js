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
		<div className={`preset-groups-container ${props.className}`}>
      <div className="">
      	{props.factoryPresets.map((fp, i) =>{
  				return <div key={i} onClick={()=> sendSysex(fp.message)}>{fp.label}</div>
  			})}
      </div>
    </div>
  )

}