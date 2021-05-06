export default function MerisConfig(props){

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
                 // value={midiChannel.toString()} 
                 onChange={(e)=> console.log(e.target.value)}/>
        </div>
       </div>
    </details>
  )

}