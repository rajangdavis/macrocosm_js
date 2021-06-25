import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_enzo/layout'
import {MidiConfigContext} from '../hooks/midi_config'
import Expression from '../components/expression'
import {useState, useContext} from 'react'

export default function Home(props) {
  const [selectedPedal, setSelectedPedal] = useState('enzo')
  const [expressionVal, setExpressionVal] = useState(0);
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
          {/*<a>Enzo</a>
          <a>Hedra</a>
          <a>Polymoon</a>
          <a>Mercury 7</a>
          <a>Ottobit Jr.</a>*/}
        </div>
        <MerisEnzoLayout
          expressionVal={expressionVal}
          setExpressionVal={setExpressionVal}
          selectedPedal={selectedPedal}
          sliderData={props.sliderData}
          midiObject={props.midiObject}
        />
        <Expression
          expressionVal={expressionVal}
          setExpressionVal={setExpressionVal}
          midiData={midiData}
          midiObject={props.midiObject} />
      </div>
    </div>
  )
}