import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_pedals/meris_enzo/layout'
import MerisPresetsMap from '../components/pedals/meris_pedals/factory_presets/meris_presets_map'
import MerisPresets from '../components/pedals/meris_pedals/meris_presets'

// Create a mega hook
import {WebMidi} from 'webmidi'
import {useState, useEffect} from 'react'
import enzoInitialState from '../components/pedals/meris_pedals/meris_enzo/initial_state'
import enzoStateReducer from '../hooks/enzo_state'
import useLocalStorage from '../hooks/use_local_storage'


export default function Home() {
  // GLOBAL
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
    // ADD to enzo state
    channel: 1
  });

  const [selectedPedal, setSelectedPedal] = useState('enzo')
  const [initialState, setState] = useLocalStorage('enzo_state', enzoInitialState)
  const [enzoState, enzoDispatch] = enzoStateReducer(initialState, {midiData: midiData, midiObject: midiObject});

  useEffect(()=>{
    WebMidi.enable({sysex: true})
      .then((access)=>{
        setMidiObject(access);
      })
    setState(enzoState)
  }, []);

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div>
        <div className="main-display">
          <MerisEnzoLayout 
            sliderData={sliderData}
            midiObject={midiObject}
            enzoState={enzoState}
            enzoDispatch={enzoDispatch}
            midiData={midiData}
          />
          <button className="presets-button">PRESETS</button>
        </div>
      </div>
    </div>
  )
}