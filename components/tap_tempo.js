export default function TapTempo(props){
  let deviceOutput = props.midiObject.outputValues.filter(x => x.name == props.md.output_port)[0]

  let tap = async ()=>{
  	console.log('tap')
  	await Promise.all([
		  deviceOutput.sendControlChange(28, 127, {channels: 1}),
			deviceOutput.sendControlChange(28, 127, {channels: 2}),
			deviceOutput.sendControlChange(28, 127, {channels: 3}),
			// deviceOutput.sendControlChange(28, 127, {channels: 4}),
			deviceOutput.sendControlChange(28, 127, {channels: 5}),
		]);
  }


	return(<div className="expression-pedal">
	        <p>Tap Tempo</p>
		        <button onClick={tap}>Tap</button>
	        <br/>
	        <br/>
	      </div>)
}