import React from 'react'
import GenericKnob from '../generic_knob'
import GenericButton from '../generic_button'
import GroupableButtons from '../groupable_buttons'
import MidiChannelSelect from '../midi_channel_select'
import ProgramChangeInput from '../program_change_input'
import * as f from '../../pedal_functions/meris_enzo'

export default class MerisEnzo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: true,
      midiChannel: "1",
      midiPreset: "1"
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
    return <div className="meris-enzo">
      <a onClick={this.showControls}>Meris Enzo</a>
      <div className={this.isActive()} >
        <div>
          <MidiChannelSelect midiChannelChange={this.midiChannelChange} midiChannel={this.state.midiChannel}/>
          <ProgramChangeInput label={"Preset"} programNumber={this.state.midiPreset} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} max={16}/>
          <div className="controls">
          	{Object.keys(f).map((control, i) =>{
	            let localControl = f[control];
	            if(localControl.type == 'button'){
	              return <GenericButton className={localControl.className} key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} />
	            }else if(localControl.type == 'knob'){
	              return <GenericKnob className={localControl.className} key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} />
	            }else if(localControl.type == 'groupable_button'){
	              return <GroupableButtons className={localControl.className} key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} />
	            }

	          })}
          </div>
        </div>

        
      </div>
      
      <style jsx>{`
        .meris-enzo{
          border: 1px solid gold;
          padding: 15px;
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
