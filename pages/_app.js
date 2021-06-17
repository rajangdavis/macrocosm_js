import dynamic from "next/dynamic";
import '../public/ywft-ultramagnetic-light.css'
import '../public/main.css'
import '../public/nav.css'
import '../public/presets_modal.css'
import '../public/custom_select.css'
import '../public/custom_slider.css'
import '../public/midi_channel_input.css'
import '../public/meris_enzo.css'
import HeaderNav from '../components/header_nav'
import useLocalStorage from '../hooks/use_local_storage'
import {MidiConfigProvider, MidiConfigContext} from '../hooks/midi_config'
import {WebMidi} from 'webmidi'
import {useState, useEffect} from 'react'

function MyApp({ Component, pageProps }) {
	const [midiObject, setMidiObject] = useState({
    outputs: []
  });

	useEffect(()=>{
	  WebMidi.enable({sysex: true})
	    .then((access)=>{
	      setMidiObject(access);
	    })
	}, []);

	const [sliderData, setSliderData] = useLocalStorage('slider_data', {
    opacity: 0,
    rotation: 0,
    placement: 0
  })

  return (<div className="main">
			<MidiConfigProvider>
				<HeaderNav
					midiObject={midiObject}
					setMidiObject={setMidiObject}
					sliderData={sliderData}
					setSliderData={setSliderData}
					/>
				<Component {...pageProps} midiObject={midiObject} sliderData={sliderData}/>
			</MidiConfigProvider>
	</div>)
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});