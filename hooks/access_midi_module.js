import { useState, useEffect } from 'react'

export default function AccessMidi(){
  const [midiObject, setMidiObject] = useState({MIDI:{}, inputValues: [], outputValues: []});
  useEffect(() => {
    var loadScript = function (src) {
      var tag = document.createElement('script');
      tag.async = false;
      tag.src = src;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    }
    loadScript("https://cdn.jsdelivr.net/npm/webmidi@next/dist/webmidi.iife.js");
    let success = (access)=>{
      setMidiObject({
        MIDI :{
          access: access,
          inputs: access.inputs,
          outputs: access.outputs,
        },
        inputValues: Array.from(access.inputs.values()), 
        outputValues: Array.from(access.outputs.values()) 
      })
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
  }, []);

  return midiObject;
}
