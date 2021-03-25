import {Knob,  Arc, Pointer } from 'rc-knob'

export default function GenericKnob(props){

  let sendChangeMessage = function(value){
    console.log(props);
  	let intMidiChannel = parseInt(props.midiChannel)
  	let intValue = parseInt(value)
  	props.deviceOutput.sendControlChange(props.mappedTo.ccValue, intValue, {channels: intMidiChannel});
    console.log(`${props.pedalName} made a change`, props.mappedTo.ccValue, intValue, {channels: intMidiChannel})
    props.controlChange(props.pedalFunction, intValue);
  }

  return (<div className={props.className}> 
            <Knob 
            size={100}  
            angleOffset={220} 
            angleRange={280}
            min={0}
            max={127}
            value={props.mappedTo.value}
            className="styledKnob"
            onChange={sendChangeMessage}
          >
            <Arc 
              arcWidth={1.5}
            />
            <circle r="40" cx="50" cy="50" />
            <Pointer 
              width={2}
              height={35}
              radius={10}
              type="rect"
              color="#fff"
            />
          </Knob>
          <label className="knob-labels">
              {props.mappedTo.label}
          </label>
          </div>
      )
}
