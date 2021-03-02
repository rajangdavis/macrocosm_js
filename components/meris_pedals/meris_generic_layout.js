import React from 'react'
import MerisGenericControls from './meris_generic_controls'
import MidiChannelSelect from '../midi_channel_select'
import ProgramChangeInput from '../program_change_input'

export default class MerisGenericLayout extends React.Component {
  constructor(props, context, pedalData) {
    super(props, context);

    this.state = {
      active: true,
      midiChannel: "1",
      midiPreset: "1",
      pedalData: pedalData
    };

    this.showControls = this.showControls.bind(this);
    this.deviceOutput = this.deviceOutput.bind(this);
    this.midiChannelChange = this.midiChannelChange.bind(this);
    this.programNumberChange = this.programNumberChange.bind(this);
  }

  midiChannelChange(e){
    this.setState({midiChannel: event.target.value})
  }

  showControls() {
    this.setState({
      active: !this.state.active
    });
  }

  isActive(){
    return (this.state.active && !this.outputPortNotSet()) ? "" : "hidden"
  }
  
  outputPortNotSet(){
    return this.props.outputPort == ""
  }

  deviceOutput(){
    return this.props.midiObject().outputs.filter((x) => x.name == this.props.outputPort)[0];
  }

  programNumberChange(e){
    this.setState({midiPreset: event.target.value})
  }
  
  render(){
    // <div className="alt-controls">
    //   <MerisGenericControls direction={'alt-left'} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
    //   <MerisGenericControls direction={'alt-center'} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
    //   <MerisGenericControls direction={'alt-right'} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
    // </div>
    let className = this.state.pedalData.className
    let name = this.state.pedalData.name
    return <div className={className}>
      <a onClick={this.showControls}>{name}</a>
      <div className={`interface ${this.isActive()}`} >
        <div className="channel-input">
          <MidiChannelSelect className={"midi-channel-input"} midiChannelChange={this.midiChannelChange} midiChannel={this.state.midiChannel}/>
          <ProgramChangeInput className={"presets-container"} label={"Preset"} programNumber={this.state.midiPreset} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} max={16}/>
        </div>
        <div className="controls">
          <MerisGenericControls direction={'left'} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
          <MerisGenericControls direction={'center'} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
          <MerisGenericControls direction={'right'} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
        </div>
      </div>      
    </div>
  }  
}
