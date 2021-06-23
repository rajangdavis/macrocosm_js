import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_enzo/layout'
import {MidiConfigContext} from '../hooks/midi_config'
import Expression from '../components/expression'
import {useState, useContext} from 'react'

export default function Home(props) {
  const [selectedPedal, setSelectedPedal] = useState('enzo')
  const {midiConfig} = useContext(MidiConfigContext)
  const midiData = {channel: midiConfig[`${selectedPedal}Channel`], output: midiConfig.output}

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="view-port">
        <div className="pedal-selector">

        </div>
        <MerisEnzoLayout
          selectedPedal={selectedPedal}
          sliderData={props.sliderData}
          midiObject={props.midiObject}
        />
        <Expression
          midiData={midiData}
          midiObject={props.midiObject} />
      </div>
    </div>
  )
}