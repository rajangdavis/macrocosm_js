export default function GroupableButtons(props){

  let sendChangeMessage = function(value){
  	let intMidiChannel = parseInt(props.midiChannel)
  	let intValue = parseInt(value)
  	props.deviceOutput.sendControlChange(props.mappedTo.ccValue, intValue, {channels: intMidiChannel});
    console.log(`${props.pedalName} sent a change message`, props.mappedTo.ccValue, intValue, {channels: intMidiChannel})
    props.controlChange(props.pedalFunction, intValue);
  }
  
  return (<div className={props.className}> 
      <div>
        <label>{props.mappedTo.label}</label>
        <div>
          {props.mappedTo.values.map((x,i) => {
            return <button key={i} onClick={()=> sendChangeMessage(x.value) }>{x.label}</button>
          })}
        </div>
      </div>
    </div>)
}
