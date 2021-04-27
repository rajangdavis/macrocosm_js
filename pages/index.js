import Head from 'next/head'
import {useState, useEffect} from 'react'
import MerisEnzoLayout from '../components/pedals/meris_pedals/layouts/meris_enzo'
import MidiChannelSelect from '../components/midi_channel_select'
import {WebMidi} from 'webmidi'

export default function Home() {
  const [sliderOpacity, setSliderOpacity] = useState(0);
  const [midiObject, setMidiObject] = useState({inputs: [], outputs: []});
  const [midiChannel, setMidiChannel] = useState(1);
  const [midiInput, setMidiInput] = useState(null);
  const [midiOutput, setMidiOutput] = useState(null);
  
  useEffect(()=>{
    WebMidi.enable()
      .then((access)=>{
        setMidiObject(access);
      })
  }, [])
  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <div>
        <div>
          <label>Slider Opacity</label>
          <input type="range" 
                 min="0" 
                 max="100"
                 value={sliderOpacity}
                 onChange={(e)=> setSliderOpacity(e.target.value)}/>
        </div>
        <div>
          <label>Input</label>
          <select onChange={(e)=> setMidiInput(e.target.value)}>
            <option value="">Pick an input</option>
            {midiObject.inputs.map((input, i)=>{
              return <option key={i}>{input.name}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Output</label>
          <select onChange={(e)=> setMidiOutput(e.target.value)}>
            <option value="">Pick an output</option>
            {midiObject.outputs.map((output, o)=>{
              return <option key={o}>{output.name}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>MIDI Channel</label>
          <input type="number" 
                 min="1" 
                 max="16" 
                 value={midiChannel.toString()} 
                 onChange={(e)=> setMidiChannel(e.target.value)}/>
        </div>
        <MerisEnzoLayout 
          sliderOpacity={sliderOpacity}
          midiObject={midiObject}
          midiInput={midiInput}
          midiOutput={midiOutput}
          midiChannel={midiChannel}
        />
      </div>
    </div>
  )
}