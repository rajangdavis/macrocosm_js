import Head from "next/head";
import dynamic from "next/dynamic";
import "../public/main.css";
import { MidiConfigProvider } from "../hooks/midi_config";
import { SliderStateProvider } from "../hooks/slider_state";
import { FactoryPresetsProvider } from "../hooks/presets_state";
import { PedalStatesProvider } from "../hooks/pedal_states";
import { WebMidiProvider } from "../hooks/web_midi_state";

function MyApp({ Component, pageProps }) {
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
          <WebMidiProvider>
            <MidiConfigProvider>
              <SliderStateProvider>
                <Component {...pageProps} />
              </SliderStateProvider>
            </MidiConfigProvider>
          </WebMidiProvider>
        </FactoryPresetsProvider>
      </PedalStatesProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
