import Head from 'next/head'
import MerisEnzoLayout from '../components/pedals/meris_enzo/layout'
import {useState} from 'react'

export default function Home(props) {

  // const [selectedPedal, setSelectedPedal] = useState('enzo')
  const [expressionVal, setExpressionVal] = useState(0);

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
          sliderData={props.sliderData}
          midiObject={props.midiObject}
        />
        <div className="expression-container">
          <div className="expression">
            <input type="range"
                   value={expressionVal}
                   min="0"
                   max="127"
                   onChange={(e)=>{ return setExpressionVal(e.target.value)}}/>
            <label>
              EXPRESSION
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}