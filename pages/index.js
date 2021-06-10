import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_enzo/layout'
import {useState} from 'react'

export default function Home(props) {

  // const [selectedPedal, setSelectedPedal] = useState('enzo')

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div>
        <MerisEnzoLayout
          sliderData={props.sliderData}
          midiObject={props.midiObject}
        />
      </div>
    </div>
  )
}