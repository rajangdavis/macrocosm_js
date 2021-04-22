import Head from 'next/head'
import {useState} from 'react'
import MerisEnzoLayout from '../components/pedals/meris_pedals/layouts/meris_enzo'

export default function Home() {
  const [sliderOpacity, setSliderOpacity] = useState(0);

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <div>
        <div>
          <label>Slider Opacity</label>
          <input type="range" 
                 min="0" 
                 max="100"
                 value={sliderOpacity}
                 onChange={(e)=> setSliderOpacity(e.target.value)}/>
        </div>
        <MerisEnzoLayout sliderOpacity={sliderOpacity}/>
      </div>
    </div>
  )
}