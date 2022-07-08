import Head from "next/head";
import dynamic from "next/dynamic";
import "../public/main.css";
import { MidiConfigProvider } from "../hooks/midi_config";
import { MacrosProvider } from "../hooks/macro_state";
import { SliderStateProvider } from "../hooks/slider_state";
import { SelectedPedalProvider } from "../hooks/selected_pedal_state";
import { PageStateProvider } from "../hooks/page_state";
import { FactoryPresetsProvider } from "../hooks/presets_state";
import { PedalStatesProvider } from "../hooks/pedal_states";
import { WebMidiProvider } from "../hooks/web_midi_state";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ background: "honeydew" }}>
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
          <MacrosProvider>
            <SelectedPedalProvider>
              <WebMidiProvider>
                <MidiConfigProvider>
                  <SliderStateProvider>
                    <PageStateProvider>
                      <Component {...pageProps} />
                    </PageStateProvider>
                  </SliderStateProvider>
                </MidiConfigProvider>
              </WebMidiProvider>
            </SelectedPedalProvider>
          </MacrosProvider>
        </FactoryPresetsProvider>
      </PedalStatesProvider>
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
