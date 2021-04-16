import MidiDevicePortSelector from './midi_device_port_selector'

export default function ExpressionPedalListener(props){
	let deviceInput = props.midiObject.inputValues.filter(x => x.name == props.md.input_port)[0]
  let deviceOutput = props.midiObject.outputValues.filter(x => x.name == props.md.output_port)[0]
	
	let createListener = ()=>{
		deviceInput.addListener("midimessage", messageReceived)
	}

	let messageReceived = (message)=>{
		let rawData = message.rawData
		if(rawData[0] == 180){
			deviceOutput.sendControlChange(4, rawData[2], {channels: 1});
			deviceOutput.sendControlChange(4, rawData[2], {channels: 2});
			deviceOutput.sendControlChange(4, rawData[2], {channels: 3});
			deviceOutput.sendControlChange(4, rawData[2], {channels: 4});
			deviceOutput.sendControlChange(4, rawData[2], {channels: 5});
		}
	}

	let finalPass = ()=>{
		if(deviceInput.getListenerCount('midimessage') == 0){
			createListener();
			console.log("Connected device");
		}else{
			console.log("Already connected");
		}
	}

	let secondPass = ()=>{
		if(deviceOutput != undefined){
			finalPass()
		}else{
			console.log("No device output")
		}
	}

	let firstPass = ()=>{
		if(deviceInput != undefined){
			secondPass()
		}else{
			console.log("No device input")
		}
	}

	firstPass()	

	return(<div className="expression-pedal">
	        <p>Expression Pedal</p>
		        <MidiDevicePortSelector onChange={props.inputPortChange} label="input" ports={props.midiObject.inputValues} value={props.md.input_port} />
	        <br/>
	        <br/>
	      </div>)
}