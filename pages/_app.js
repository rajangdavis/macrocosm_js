import dynamic from "next/dynamic";
import '../public/ywft-ultramagnetic-light.css'
import '../public/main.css'
import '../public/nav.css'
import '../public/custom_select.css'
import '../public/custom_slider.css'
import '../public/midi_channel_input.css'
import '../public/meris_enzo.css'
import HeaderNav from '../components/header'
import {WebMidi} from 'webmidi'
import {useState, useEffect} from 'react'

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
	const [midiObject, setMidiObject] = useState({
    outputs: []
  });

	const [sliderData, setSliderData] = useState({
    opacity: 0,
    rotation: 0,
    placement: 0
  });

  return (<div className="main">
			<HeaderNav
				midiObject={midiObject}
				setMidiObject={setMidiObject}
				sliderData={sliderData}
				setSliderData={setSliderData}
				/>
			<Component {...pageProps} midiObject={midiObject} sliderData={sliderData}/>
	</div>)
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});