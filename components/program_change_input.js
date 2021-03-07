import React from 'react'

export default class ProgramChangeInput extends React.Component {
	constructor(props, context) {
    super(props, context);
    this.state = {
      programNumber: "1",
      label: this.props.label || "Program Number",
      max: this.props.max ? this.props.max.toString() : "127",
      midiChannel: "1"
    }
    this.programNumberChange = this.programNumberChange.bind(this);
    this.programNumber = this.programNumber.bind(this);
  }

  programNumberChange(e){
    let intMidiChannel = parseInt(this.state.midiChannel);
    let intProgramNumber = parseInt(this.state.programNumber);
    this.props.deviceOutput().setProgram(intProgramNumber, {channels: intMidiChannel});
    console.log("Command sent", {intProgramNumber: intProgramNumber, channels: intMidiChannel})
    this.state.programNumber = e.target.value
  }

  programNumber(){
    this.state.programNumber
  }
  
  render(){
    return <div className={this.props.className}> 
      <label>{this.state.label}</label>
      <input disabled={this.props.disabled} type="number" value={this.programNumber()} min="1" max={this.state.max} onChange={this.programNumberChange}/>
    </div>
  }
}
