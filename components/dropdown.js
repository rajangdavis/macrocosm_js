import React from 'react'
import MidiChannelSelect from '../components/midi_channel_select'
import ProgramChangeInput from '../components/program_change_input'
import MidiDevicePortSelector from '../components/midi_device_port_selector'

export default class DropDown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: true,
      midiChannel: "1",
      programNumber: "1",
      devicePort: '',
    };

    this.showControls = this.showControls.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.midiChannelChange = this.midiChannelChange.bind(this);
    this.devicePortChange = this.devicePortChange.bind(this);
  }

  midiChannelChange(e){
    this.setState({midiChannel: event.target.value},()=>{
      this.sendCommand();
    })
  }

  devicePortChange(e){
    this.setState({devicePort: event.target.value}) 
  }

  showControls() {
    this.setState({
      active: !this.state.active
    });
  }

  sendCommand(){
    let device = this.props.MIDI.outputs.filter((x) => x.name == this.state.devicePort)[0]
    if (device != undefined){
      let intMidiChannel = parseInt(this.state.midiChannel);
      let intProgramNumber = parseInt(this.state.programNumber);
      device.setProgram(intProgramNumber, {channels: intMidiChannel});
      console.log("Command sent", {intMidiChannel: intMidiChannel, channels: intMidiChannel})
    }
  }

  isActive(){
    return this.state.active ? "" : "hidden"
  }
  devicePortNotSet(){
    return this.state.devicePort == ""
  }
  
  render(){
    return <li key={this.props.pedal}>
      <a onClick={this.showControls}>{this.props.pedal}</a>
      <div className={this.isActive()} >
        <MidiDevicePortSelector outputValues={this.props.outputValues} devicePort={this.state.devicePort} devicePortChange={this.devicePortChange}/>
        <div>
          <ProgramChangeInput disabled={ this.devicePortNotSet() } programNumberChange={this.programNumberChange} programNumber={this.state.programNumber} />
          <button disabled={ this.devicePortNotSet() } onClick={this.sendCommand}>Send</button>
        </div>
      </div>
      
      <style jsx>{`
        .hidden{
          display: none !important;
        }
        button{
          margin: 10px auto 5px;
          display: block;
          font-weight: bold;
        }
      `}</style>
    </li>
  }
}
