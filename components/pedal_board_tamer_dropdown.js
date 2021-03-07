import React from 'react'
import MidiChannelSelect from '../components/midi_channel_select'
import ProgramChangeInput from '../components/program_change_input'
import MidiDevicePortSelector from '../components/midi_device_port_selector'

export default class PedalBoardTamerDropDown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: true,
      midiChannel: "1",
      programNumber: "1",
      devicePort: '',
    };

    this.showControls = this.showControls.bind(this);
    this.midiChannelChange = this.midiChannelChange.bind(this);  
    this.devicePortChange = this.devicePortChange.bind(this);
    this.deviceOutput = this.deviceOutput.bind(this);
  }

  midiChannelChange(){
    this.setState({ midiChannel: event.target.value })
  }

  devicePortChange(){
    this.setState({ devicePort: event.target.value} ) 
  }

  showControls(){
    this.setState({ active: !this.state.active })
  }

  isActive(){
    return this.state.active ? "" : "hidden"
  }
  devicePortNotSet(){
    return this.state.devicePort == ""
  }

  deviceOutput(){
    return this.props.midiObject().outputs.filter((x) => x.name == this.state.devicePort)[0];
  }
  
  render(){
    return <div className="pedal-tamer">
      <a onClick={this.showControls}>Pedal Tamer</a>
      <div className={this.isActive()} >
        <MidiDevicePortSelector ports={this.props.outputValues} devicePort={this.state.devicePort} portChange={this.devicePortChange} label='output'/>
        <div>
          <MidiChannelSelect disabled={ this.devicePortNotSet() } midiChannelChange={this.midiChannelChange} midiChannel={this.state.midiChannel}/>
          <ProgramChangeInput disabled={ this.devicePortNotSet() } deviceOutput={this.deviceOutput} programNumber={this.state.programNumber} />
        </div>
      </div>
      
      <style jsx>{`
        .pedal-tamer{
          border: 2px solid #b4cfb0;
          padding: 20px;
          margin-bottom:10px
        }
        .hidden{
          display: none !important;
        }
        button{
          margin: 10px auto 5px;
          display: block;
          font-weight: bold;
        }
      `}</style>
    </div>
  }
}
