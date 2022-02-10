import dynamic from "next/dynamic";
import '../public/main.css'
import HeaderNav from '../components/header_nav'
import {MidiConfigProvider} from '../hooks/midi_config'
import {SliderStateProvider} from '../hooks/slider_state'
import {FactoryPresetsProvider} from '../hooks/presets_state'
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

  return (<div>
  		<FactoryPresetsProvider>
				<MidiConfigProvider>
					<SliderStateProvider>
						<Component {...pageProps} midiObject={midiObject}/>
					</SliderStateProvider>
				</MidiConfigProvider>
			</FactoryPresetsProvider>
	</div>)
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});