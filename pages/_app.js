import dynamic from "next/dynamic";
import '../public/main.css'
import HeaderNav from '../components/header_nav'
import useLocalStorage from '../hooks/use_local_storage'
import {MidiConfigProvider, MidiConfigContext} from '../hooks/midi_config'
import {WebMidi} from 'webmidi'
import {useState, useEffect} from 'react'

function MyApp({ Component, pageProps }) {
	const [midiObject, setMidiObject] = useState({
    outputs: []
  });

  const [isConnected, setIsConnected] = useState(false);

	useEffect(()=>{
	  WebMidi.enable({sysex: true})
	    .then((access)=>{
	      setMidiObject(access);
	    })
	}, []);

	useEffect(()=>{
		document.body.className = addStripesIfConnected();
	}, [isConnected]);

	const [sliderData, setSliderData] = useLocalStorage('slider_data', {
    opacity: 0,
    rotation: 0,
    placement: 0
  })

  const addStripesIfConnected = () =>{
		if(isConnected){
			return "main diagonal-stripe-1"
		}else{
			return "main"
		}
  }

  return (<div>
			<MidiConfigProvider>
				<HeaderNav
					setIsConnected={setIsConnected}
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