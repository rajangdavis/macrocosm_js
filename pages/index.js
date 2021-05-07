import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_pedals/meris_enzo/layout'
import MerisPresetsMap from '../components/pedals/meris_pedals/factory_presets/meris_presets_map'
import SliderControls from '../components/slider_controls'
import MidiControls from '../components/midi_controls'
import MerisConfig from '../components/pedals/meris_pedals/meris_config'
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
        </div>
        <div className="main-display">
          <div className="pedal-selector">
            <a onClick={()=> setSelectedPedal('enzo')}>Meris Enzo</a>
            <a onClick={()=> setSelectedPedal('hedra')}>Meris Hedra</a>
            <a onClick={()=> setSelectedPedal('polymoon')}>Meris Polymoon</a>
            <a onClick={()=> setSelectedPedal('mercury7')}>Meris Mercury7</a>
            <a onClick={()=> setSelectedPedal('ottobit jr')}>Meris Ottobit JR.</a>
          </div>
          {
            selectedPedal == 'enzo' && 
            <MerisEnzoLayout 
              sliderData={sliderData}
              midiObject={midiObject}
              enzoState={enzoState}
              enzoDispatch={enzoDispatch}
              midiData={midiData}
            />
          }
          {
            selectedPedal == 'hedra' && 
            <MerisEnzoLayout 
              sliderData={sliderData}
              midiObject={midiObject}
              enzoState={enzoState}
              enzoDispatch={enzoDispatch}
              midiData={midiData}
            />
          }
          {
            selectedPedal == 'polymoon' && 
            <MerisEnzoLayout 
              sliderData={sliderData}
              midiObject={midiObject}
              enzoState={enzoState}
              enzoDispatch={enzoDispatch}
              midiData={midiData}
            />
          }
          {
            selectedPedal == 'mercury7' && 
            <MerisEnzoLayout 
              sliderData={sliderData}
              midiObject={midiObject}
              enzoState={enzoState}
              enzoDispatch={enzoDispatch}
              midiData={midiData}
            />
          }
          {
            selectedPedal == 'ottobit jr' && 
            <MerisEnzoLayout 
              sliderData={sliderData}
              midiObject={midiObject}
              enzoState={enzoState}
              enzoDispatch={enzoDispatch}
              midiData={midiData}
            />
          }
          <div>
            <MerisConfig
              className={midiData.output ? '' : 'hidden'}
              selectedPedal={selectedPedal}
              setMidiData={setMidiData}
              midiData={midiData}
              />
            <MerisPresets
              className={midiData.output ? '' : 'hidden'}
              factoryPresets={MerisPresetsMap[selectedPedal]}
              selectedPedal={selectedPedal}
              />
          </div>
        </div>
      </div>
    </div>
  )
}