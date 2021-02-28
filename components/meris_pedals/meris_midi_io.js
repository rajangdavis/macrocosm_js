import React from 'react'
import MidiChannelSelect from '../midi_channel_select'
import MerisHedra from './meris_hedra'
import MerisEnzo from './meris_enzo'
import ProgramChangeInput from '../program_change_input'
import MidiDevicePortSelector from '../midi_device_port_selector'

export default class MerisMidiIo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: true,
      midiChannel: "1",
      programNumber: "1",
      inputPort: '',
      outputPort: '',
    };

    this.showControls = this.showControls.bind(this);
    this.inputPortChange = this.inputPortChange.bind(this);
    this.outputPortChange = this.outputPortChange.bind(this);
  }

  inputPortChange(e){
    this.setState({inputPort: event.target.value}) 
  }

  outputPortChange(e){
    this.setState({outputPort: event.target.value}) 
  }

  showControls() {
    this.setState({ active: !this.state.active });
  }

  isActive(){
    return this.state.active ? "" : "hidden"
  }
  inputPortNotSet(){
    return this.state.inputPort == ""
  }

  outputPortNotSet(){
    return this.state.outputPort == ""
  }
  
// <MerisHedra midiObject={this.props.midiObject} inputPort={this.state.inputPort} outputPort={this.state.outputPort} />
  render(){
    return <div className="meris-midi-io">
      <a onClick={this.showControls}>Meris MIDI IO</a>
      <div className={this.isActive()} >
        <MidiDevicePortSelector ports={this.props.inputValues} portChange={this.inputPortChange} label="input"/>
        <MidiDevicePortSelector ports={this.props.outputValues} portChange={this.outputPortChange} label="output"/>
        <MerisEnzo midiObject={this.props.midiObject} inputPort={this.state.inputPort} outputPort={this.state.outputPort} />
      </div>
      
      <style jsx>{`
      	.meris-midi-io{
      		border: 1px solid black;
      		padding: 20px;
      		margin-bottom: 10px;
      	}
        .hidden{
          display: none !important;
        }
      `}</style>
    </div>
  }
}
