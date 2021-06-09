import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_enzo/layout'
import MerisEnzoPresets from '../components/pedals/factory_presets/meris_enzo'
import PresetsModal from '../components/presets_modal'
import {useState} from 'react'

export default function Home(props) {

  // const [selectedPedal, setSelectedPedal] = useState('enzo')
  const [presetsOpen, setPresetsOpen] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(null);
  let presetsButtonClass = presetsOpen ? "presets-button open" : "presets-button"

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div>
        <div className="main-display">
          <button className={presetsButtonClass} onClick={()=>setPresetsOpen(!presetsOpen)}>PRESETS/SETTINGS</button>
          <MerisEnzoLayout
            sliderData={props.sliderData}
            midiObject={props.midiObject}
          />
          {
            presetsOpen &&
            <PresetsModal
              midiObject={props.midiObject}
              setPresetsOpen={setPresetsOpen}
              presets={MerisEnzoPresets}
              selectedPreset={selectedPreset}
              setSelectedPreset={setSelectedPreset}
            />
          }
        </div>
      </div>
    </div>
  )
}