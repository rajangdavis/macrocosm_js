import Head from "next/head";
import dynamic from "next/dynamic";
import "../public/main.css";
import { MidiConfigProvider } from "../hooks/midi_config";
import { SliderStateProvider } from "../hooks/slider_state";
import { FactoryPresetsProvider } from "../hooks/presets_state";
import { PedalStatesProvider } from "../hooks/pedal_states";
import { WebMidi } from "webmidi";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [midiObject, setMidiObject] = useState({
    outputs: [],
  });

  // const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    WebMidi.enable({ sysex: true }).then((access) => {
      setMidiObject(access);
    });
  }, []);

  return (
    <>
      <Head>
        <title>macrocosm</title>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <PedalStatesProvider>
        <FactoryPresetsProvider>
          <MidiConfigProvider>
            <SliderStateProvider>
              <Component {...pageProps} midiObject={midiObject} />
            </SliderStateProvider>
          </MidiConfigProvider>
        </FactoryPresetsProvider>
      </PedalStatesProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
