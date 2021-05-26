import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_pedals/meris_enzo/layout'
import MerisPresetsMap from '../components/pedals/meris_pedals/factory_presets/meris_presets_map'
import MerisPresets from '../components/pedals/meris_pedals/meris_presets'

// Create a mega hook
import {useState} from 'react'
import enzoInitialState from '../components/pedals/meris_pedals/meris_enzo/initial_state'
import enzoStateReducer from '../hooks/enzo_state'
import useLocalStorage from '../hooks/use_local_storage'


export default function Home(props) {

  const [selectedPedal, setSelectedPedal] = useState('enzo')

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div>
        <div className="main-display">
          <MerisEnzoLayout
            sliderData={props.sliderData}
            midiObject={props.midiObject}
          />
          <button className="presets-button">PRESETS</button>
        </div>
      </div>
    </div>
  )
}