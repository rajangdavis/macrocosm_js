import Head from 'next/head'
import dynamic from "next/dynamic";
import '../public/main.css'
import HeaderNav from '../components/header_nav'
import {MidiConfigProvider} from '../hooks/midi_config'
import {SliderStateProvider} from '../hooks/slider_state'
import {FactoryPresetsProvider} from '../hooks/presets_state'
import {PedalStatesProvider} from '../hooks/pedal_states'
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

  return (
		<div>
			<Head>
        <title>macrocosm</title>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      </Head>
      <PedalStatesProvider>
				<FactoryPresetsProvider>
					<MidiConfigProvider>
						<SliderStateProvider>
							<Component {...pageProps} midiObject={midiObject}/>
						</SliderStateProvider>
					</MidiConfigProvider>
				</FactoryPresetsProvider>
			</PedalStatesProvider>
	</div>)
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});