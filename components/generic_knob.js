export default function GenericKnob(props){

  let sendChangeMessage = function(event){
  	let intMidiChannel = parseInt(props.midiChannel)
  	let intValue = parseInt(event.target.value)
    props.controlChange(props.pedalFunction, intValue);
  }

  let updateVal = function(event){
    let intMidiChannel = parseInt(props.midiChannel)
    let intValue = parseInt(event.target.value)
    props.deviceOutput.sendControlChange(props.mappedTo.ccValue, intValue, {channels: intMidiChannel});
    console.log(`${props.pedalName} made a change`, props.mappedTo.ccValue, intValue, {channels: intMidiChannel})
    props.controlChange(props.pedalFunction, intValue);
  }

  let translateValToAngle = function(){
    let angle = (270/127)*props.mappedTo.value;
    return `rotate(${angle}, 41.6277, 41.6277)`
  }

  let stroke  = ()=>{
    return <line 
            id={props.pedalFunction} 
            x1="10.6277" 
            y1="70.6662" 
            x2="41.6277" 
            y2="41.6662" 
            stroke="white" 
            strokeWidth="2%" 
            transform={translateValToAngle()}/>
  }

  return(
    <div className={`${props.className} styled-knob`}>
      <input className="hidden-range" 
             type="range" 
             min="1" 
             max="127" 
             value={props.mappedTo.value} 
             onChange={sendChangeMessage} onClickCapture={updateVal}/>
      <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
        <rect width="86" height="86" fill="none"/>
        <circle cx="42.5" cy="42.5" r="42.5" fill="black"/>
        {stroke()}
      </svg>
      <label className="knob-labels">
          {props.mappedTo.label}
      </label>
    </div>
  )
}
