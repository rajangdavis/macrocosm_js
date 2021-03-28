export default function MerisInputListener(props){
	let createListener = ()=>{
		props.deviceInput.addListener("midimessage", sendMessage)
	}

	let sendMessage = (message)=>{
		if(message.dataBytes != undefined){
			let field = findFieldToChange(message.dataBytes[0])
			props.dispatch({
				type: 'update-pedal',
				field: field,
				new_value: message.dataBytes[1],
				midi_device_id:	props.midi_device_id,
				macro_id: props.macro_id,
				pedal_id: props.pedal_id
			})
		}else if(props.can_listen == true){
			props.dispatch({
				type: 'update-pedal',
				new_state: parseSysexMessage(message),
				midi_device_id:	props.midi_device_id,
				macro_id: props.macro_id,
				pedal_id: props.pedal_id
			})
		}
	}

	let parseSysexMessage = (message)=>{
		let rawData = message.rawData;
		return parseData(rawData);
	}

	let parseData = (rawData)=>{
		let updatedState = {}
		updatedState[findFieldToChange(9)] = rawData[22];
		updatedState[findFieldToChange(14)] = rawData[21];
// updatedState[findFieldToChange(15)] = rawData[25]; Need to figure out how to represent tempo
		updatedState[findFieldToChange(16)] = rawData[9];
		updatedState[findFieldToChange(17)] = rawData[10];
		updatedState[findFieldToChange(18)] = rawData[11];
		updatedState[findFieldToChange(19)] = rawData[12];
		updatedState[findFieldToChange(20)] = rawData[13];
		updatedState[findFieldToChange(21)] = rawData[14];
		updatedState[findFieldToChange(22)] = rawData[15];
		updatedState[findFieldToChange(23)] = rawData[16];
		updatedState[findFieldToChange(24)] = rawData[17];
		updatedState[findFieldToChange(25)] = rawData[18];
		updatedState[findFieldToChange(26)] = rawData[19];
		updatedState[findFieldToChange(27)] = rawData[20];
		updatedState[findFieldToChange(29)] = rawData[23];
		updatedState[findFieldToChange(30)] = rawData[24];
		return updatedState;
	}


	let findFieldToChange = (ccValue)=>{
		return Object.keys(props.pedalFunctions).filter(key =>{
		   return props.pedalFunctions[key].ccValue == ccValue;
		})[0]
	}


	if(props.deviceInput != undefined){
		createListener();
	}else{
		console.log("no midi input")
	}
}