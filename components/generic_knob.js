import {Knob,  Arc, Pointer, Value } from 'rc-knob'
import {useEffect} from 'react'

export default function GenericKnob(props){

  let sendChangeMessage = function(event){
  	let intMidiChannel = parseInt(props.midiChannel)
  	let intValue = parseInt(event.target.value)
  	props.deviceOutput.sendControlChange(props.mappedTo.ccValue, intValue, {channels: intMidiChannel});
    console.log(`${props.pedalName} made a change`, props.mappedTo.ccValue, intValue, {channels: intMidiChannel})
    props.controlChange(props.pedalFunction, intValue);
    console.log(test())
  }

  let translateValToAngle = function(){
    console.log(props.mappedTo.value);
    let angle = (270/127)*props.mappedTo.value;
    console.log(`rotate(${angle}, 41.6277, 41.6277)`);
    return `rotate(${angle}, 41.6277, 41.6277)`
  }

  let test  = ()=>{
    return <line id={props.pedalFunction} x1="10.6277" y1="70.6662" x2="41.6277" y2="41.6662" stroke="black" transform={translateValToAngle()}/>
  }

  return(
    <div className={`${props.className} styled-knob`}>
      <input class="hidden-range" type="range" min="1" max="127" value={props.mappedTo.value} onChange={sendChangeMessage}/>
      <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
        <rect width="86" height="86" fill="none"/>
        <circle cx="42.5" cy="42.5" r="42.5" fill="#C4C4C4"/>
        {test()}
      </svg>
      <label className="knob-labels">
          {props.mappedTo.label}
      </label>
    </div>
)
}
        // <line id={props.pedalFunction} x1="10.6277" y1="70.6662" x2="41.6277" y2="41.6662" stroke="black" />
  // return (<div className={props.className}> 
  //           <Knob 
  //           size={100}  
  //           angleOffset={220} 
  //           angleRange={280}
  //           min={0}
  //           max={127}
  //           value={props.mappedTo.value}
  //           className="styledKnob"
  //           onChange={sendChangeMessage}
  //         >
  //           <Arc 
  //             arcWidth={1.5}
  //           />
  //           <circle r="40" cx="50" cy="50" />
  //           <Pointer 
  //             width={2}
  //             height={35}
  //             radius={10}
  //             type="rect"
  //             color="#fff"
  //           />
  //           <Value/>
  //         </Knob>
  //         <label className="knob-labels">
  //          {props.mappedTo.label}
  //          </label>

  //         </div>
  //     )
