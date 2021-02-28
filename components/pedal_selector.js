import MerisMidiIo from '../components/meris_pedals/meris_midi_io' 
import PedalBoardTamerDropDown from '../components/pedal_board_tamer_dropdown' 
import React from 'react'

export default class PedalSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      midiObject:[],
      inputValues: [],
      outputValues: [],
      commands:[]
    }
    this.midiObject = this.midiObject.bind(this);
    this.inputValues = this.inputValues.bind(this);
    this.outputValues = this.outputValues.bind(this);
  }

  componentDidMount(){
    var loadScript = function (src) {
      var tag = document.createElement('script');
      tag.async = false;
      tag.src = src;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    }
    loadScript("https://cdn.jsdelivr.net/npm/webmidi@next/dist/webmidi.iife.js");
    let success = (access)=>{
      this.setState({
        MIDI :{
          access: access,
          inputs: access.inputs,
          outputs: access.outputs,
        },
        inputValues: Array.from(access.inputs.values()), 
        outputValues: Array.from(access.outputs.values()) 
      })
      this.forceUpdate();
    }

    let failure = ()=>{
      console.log('Could not connect to MIDI')
    }

    let enableMIDI = ()=>{
      window.WebMidi
        .enable({sysex: true})
        .then((access) => success(access))
        .catch(err => failure);
    }
    setTimeout(enableMIDI, 500)
  }

  midiObject(){
    return this.state.MIDI;
  }

  inputValues(){
    return this.state.inputValues;
  }

  outputValues(){
    return this.state.outputValues;
  }
  
  render() {
		
    return (
      <div className="container">
        <PedalBoardTamerDropDown inputValues={ this.inputValues } outputValues={ this.outputValues }/>
        <MerisMidiIo midiObject={this.midiObject} inputValues={ this.inputValues } outputValues={ this.outputValues }/>
        <style jsx>{`
          .hidden{
            display: none !important;
          }
          .container{
            border: 3px solid purple;
            padding: 25px;
          }
        `}</style>
      </div>
    )
  }
}


