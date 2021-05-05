export default function MidiControls(props){
	const setMidiData = props.setMidiData;
	const midiObject = props.midiObject;
	const midiData = props.midiData;

	const setMidiInputAndSetListener = (e)=>{
    setMidiData({...midiData, input: e.target.value});
  }

	return(
    <details>
      <summary>
        MIDI I/O
      </summary>
  		<div className="midi-controls">
        <div>
          <label>Input</label>
          <select onChange={(e)=> setMidiInputAndSetListener(e)}>
            <option value="">Pick an input</option>
            {midiObject != undefined && midiObject.inputs.map((input, i)=>{
              return <option key={i}>{input.name}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Output</label>
          <select onChange={(e)=> setMidiData({...midiData, output: e.target.value})}>
            <option value="">Pick an output</option>
            {midiObject != undefined && midiObject.outputs.map((output, o)=>{
              return <option key={o}>{output.name}</option>
              })
            }
          </select>
        </div>
      </div>
    </details>
	)
}