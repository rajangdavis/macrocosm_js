import React from 'react'
import GenericKnob from '../components/generic_knob'
import GenericButton from '../components/generic_button'
import MidiChannelSelect from '../components/midi_channel_select'
import ProgramChangeInput from '../components/program_change_input'
import * as f from '../pedal_functions/meris_hedra'

export default class MerisHedra extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: true,
      midiChannel: "1",
    };

    this.showControls = this.showControls.bind(this);
    this.deviceOutput = this.deviceOutput.bind(this);
    this.midiChannelChange = this.midiChannelChange.bind(this);
  }

  midiChannelChange(e){
    this.setState({midiChannel: event.target.value},()=>{
      this.sendCommand();
    })
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
  
  render(){
    return <div className="meris-hedra">
      <a onClick={this.showControls}>Meris Hedra</a>
      <div className={this.isActive()} >
        <div>
          <MidiChannelSelect midiChannelChange={this.midiChannelChange} midiChannel={this.state.midiChannel}/>
          {Object.keys(f).map((control, i) =>{
            let localControl = f[control];
            if(localControl.type == 'button'){
              return <GenericButton key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} />
            }else if(localControl.type == 'knob'){
              return <GenericKnob key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} />
            }

          })}

        </div>

        
      </div>
      
      <style jsx>{`
        .meris-hedra{
          border: 1px solid grey;
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
