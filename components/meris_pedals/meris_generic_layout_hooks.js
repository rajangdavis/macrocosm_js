import React from 'react'
import MerisPresets from './meris_presets'
import MerisGenericControls from './meris_generic_controls'
import MidiChannelSelect from '../midi_channel_select'
import ProgramChangeInput from '../program_change_input'

export default class MerisGenericLayout extends React.Component {
  constructor(props, context, pedalData) {
    super(props, context);

    this.state = {
      active: true,
      altMode: false,
      midiChannel: "1",
      midiPreset: "1",
      pedalData: pedalData,
    };

    this.showControls = this.showControls.bind(this);
    this.deviceOutput = this.deviceOutput.bind(this);
    this.midiChannelChange = this.midiChannelChange.bind(this);
    this.programNumberChange = this.programNumberChange.bind(this);
    this.changeAltState = this.changeAltState.bind(this);
    this.inAltMode = this.inAltMode.bind(this);
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
    return this.props.midiObject.MIDI.outputs.filter((x) => x.name == this.props.outputPort)[0];
  }

  programNumberChange(e){
    this.setState({midiPreset: event.target.value})
  }

  changeAltState(e){
    this.setState({
      altMode: !this.state.altMode
    })
  }

  inAltMode(){
    return this.state.altMode == true ? 'alt-' : ''
  }
  
  render(){
    let className = this.state.pedalData.className
    let name = this.state.pedalData.name

    return <div className={className}>
      <a onClick={this.showControls}>{name}</a>
      <div className={`interface ${this.isActive()}`} >
        <div className="channel-input">
          <MidiChannelSelect className={"midi-channel-input"} midiChannelChange={this.midiChannelChange} midiChannel={this.state.midiChannel}/>
          <MerisPresets deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} />
        </div>
        <div className={`${this.inAltMode()}controls`}>
          <MerisGenericControls direction={`${this.inAltMode()}left`} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput} changeAltState={this.changeAltState}/>
          <MerisGenericControls direction={`${this.inAltMode()}center`} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
          <MerisGenericControls direction={`${this.inAltMode()}right`} pedalData={this.state.pedalData} midiChannel={this.state.midiChannel} deviceOutput={this.deviceOutput}/>
        </div>
      </div>      
    </div>
  }  
}
