export default function MerisConfig(props){
  const setMidiData = props.setMidiData;
  const midiData = props.midiData;

	return (
		<details className={`pedal-config-container ${props.className}`}>
      <summary>
	    	PEDAL CONFIG
      </summary>
      <div className="pedal-config">
      	<div>
          <label>MIDI Channel</label>
          <input type="number" 
                 min="1" 
                 max="16" 
                 value={midiData.channel}
                 onChange={(e)=> setMidiData({...midiData, channel: e.target.value})}/>
        </div>
       </div>
    </details>
  )

}