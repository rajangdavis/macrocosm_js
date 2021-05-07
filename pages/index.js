import Head from 'next/head'
import {useState, useEffect} from 'react'
import MerisEnzoLayout from '../components/pedals/meris_pedals/meris_enzo/layout'
import EnzoFactoryPresets from '../components/pedals/meris_pedals/factory_presets/meris_enzo'
import SliderControls from '../components/slider_controls'
import MidiControls from '../components/midi_controls'
import MerisConfig from '../components/pedals/meris_pedals/meris_config'
import MerisPresets from '../components/pedals/meris_pedals/meris_presets'
import {WebMidi} from 'webmidi'
import { HandleMidiInput } from "../hooks/midi_io"

export default function Home() {
  const [sliderData, setSliderData] = useState({
    opacity: 0,
    rotation: 0,
    placement: 0
  });
  const [midiObject, setMidiObject] = useState({
    inputs: [], 
    outputs: []
  });
  const [midiData, setMidiData] = useState({
    input: null,
    output: null,
    channel: 1
  });

  useEffect(()=>{
    WebMidi.enable({sysex: true})
      .then((access)=>{
        setMidiObject(access);
      })
  }, []);

  return (
    <div className="main container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <div>
        <div className="controls">
          <SliderControls 
            sliderData={sliderData} 
            setSliderData={setSliderData}/>
          <MidiControls
            midiData={midiData}
            midiObject={midiObject}
            setMidiData={setMidiData}/>
          <MerisConfig
            className={midiData.output ? '' : 'hidden'}
            selectedPedal={'Meris Enzo'}
            setMidiData={setMidiData}
            midiData={midiData}
            />
          <MerisPresets
            className={midiData.output ? '' : 'hidden'}
            factoryPresets={EnzoFactoryPresets}
            selectedPedal={'Meris Enzo'}
            />
        </div>
        <MerisEnzoLayout 
          sliderData={sliderData}
          midiObject={midiObject}
          midiData={midiData}
        />
      </div>
    </div>
  )
}