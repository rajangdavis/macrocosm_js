import React from 'react'
import {Knob,  Arc, Pointer } from 'rc-knob'

export default class GenericKnob extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.sendChangeMessage = this.sendChangeMessage.bind(this);
  }

  sendChangeMessage(value){
  	let intMidiChannel = parseInt(this.props.midiChannel)
  	let intValue = parseInt(value)
  	this.props.deviceOutput().sendControlChange(this.props.mappedTo.ccValue, intValue, {channels: intMidiChannel});
    console.log("Meris Hedra sent a change message", this.props.mappedTo.ccValue, intValue, {channels: intMidiChannel})
  }

  render(){
    return <div className={this.props.className}> 
    	<label>
    		{this.props.mappedTo.label}
    	</label>
      <Knob 
      size={100}  
      angleOffset={220} 
      angleRange={280}
      min={0}
      max={127}
      className="styledKnob"
      onChange={this.sendChangeMessage}
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
    <style jsx>{`
    .styledKnob circle,
    .styledKnob path {
        fill: #fc5a96;
        opacity: 0.4;
        transition: 
          opacity 100ms, 
          color 100ms 
          ease-in-out;
    }

    .styledKnob:hover circle,
    .styledKnob:hover path,
    .styledKnob:focus circle,
    .styledKnob:focus path, {
        fill: #180094;
        opacity: 1;
        transition: 
          opacity 450ms, 
          color 450ms 
          ease-in-out;
    }
    `}</style>
    </div>
  }
}
