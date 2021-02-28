import React from 'react'

export default class GenericButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.sendChangeMessage = this.sendChangeMessage.bind(this);
  }

  sendChangeMessage(){
  	let intMidiChannel = parseInt(this.props.midiChannel)
  	this.props.deviceOutput().sendControlChange(this.props.mappedTo.ccValue, this.props.mappedTo.value,{channels: intMidiChannel});
    console.log("Meris Hedra sent a change message", this.props.mappedTo.ccValue, this.props.mappedTo.value, {channels: intMidiChannel})
  }
  
  render(){
    return <div className={this.props.className}> 
    	<label>{this.props.mappedTo.label}</label>
      <button onClick={this.sendChangeMessage}>tap</button>
      <style jsx>{`
        .hidden{
          display: none !important;
        }
        label{
          margin: 10px auto 5px;
          display: block;
          font-weight: bold;
        }
      `}</style>
    </div>
  }
}
