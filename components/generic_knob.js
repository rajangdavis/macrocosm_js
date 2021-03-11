import React from 'react'
import {Knob,  Arc, Pointer } from 'rc-knob'

export default function GenericKnob(props){

  let sendChangeMessage = function(value){
  	let intMidiChannel = parseInt(props.midiChannel)
  	let intValue = parseInt(value)
  	props.deviceOutput().sendControlChange(props.mappedTo.ccValue, intValue, {channels: intMidiChannel});
    console.log("Meris Hedra sent a change message", props.mappedTo.ccValue, intValue, {channels: intMidiChannel})
  }

  return (<div className={props.className}> 
            <Knob 
            size={100}  
            angleOffset={220} 
            angleRange={280}
            min={0}
            max={127}
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
          </div>)
}
