import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_enzo/layout'
import MerisHedraLayout from '../components/pedals/meris_hedra/layout'
import {MidiConfigContext} from '../hooks/midi_config'
import Expression from '../components/expression'
import {useState, useContext, useEffect} from 'react'

export default function Home(props) {
  const [selectedPedal, setSelectedPedal] = useState('hedra')
  const [expressionVal, setExpressionVal] = useState(0);
  const {midiConfig} = useContext(MidiConfigContext)
  const midiData = {channel: midiConfig[`${selectedPedal}Channel`], output: midiConfig.output}

  useEffect(()=>{
    setExpressionVal(0);
  }, [selectedPedal]);

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      </Head>
      <div className="view-port">
        <div className="pedal-selector">
          <a onClick={()=> setSelectedPedal('enzo')}>Enzo</a>
          <a onClick={()=> setSelectedPedal('hedra')}>Hedra</a>
          {/*<a>Polymoon</a>
          <a>Mercury 7</a>
          <a>Ottobit Jr.</a>*/}
        </div>
        {
          selectedPedal == 'enzo' &&
          <MerisEnzoLayout
            expressionVal={expressionVal}
            setExpressionVal={setExpressionVal}
            selectedPedal={selectedPedal}
            sliderData={props.sliderData}
            midiObject={props.midiObject}
          />
        }
        {
          selectedPedal == 'hedra' &&
          <MerisHedraLayout
            expressionVal={expressionVal}
            setExpressionVal={setExpressionVal}
            selectedPedal={selectedPedal}
            sliderData={props.sliderData}
            midiObject={props.midiObject}
          />
        }
        <Expression
          expressionVal={expressionVal}
          setExpressionVal={setExpressionVal}
          midiData={midiData}
          midiObject={props.midiObject} />
      </div>
    </div>
  )
}