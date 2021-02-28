import React from 'react'

export default class MidiChannelSelect extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.currentMidiChannel = this.currentMidiChannel.bind(this);
  }

  currentMidiChannel(){
    return this.midiChannel;
  }
  
  render(){
    return <div className={this.props.className}> 
      <div>
        <label>Midi Channel</label>
        <input disabled={this.props.disabled} type="number" value={this.props.midiChannel} min="1" max="16" onChange={this.props.midiChannelChange}/>
      </div>
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
