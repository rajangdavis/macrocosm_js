import Head from 'next/head'
// import MerisEnzo from '../components/pedals/meris_pedals/meris_enzo'
// import MerisMidiIo from '../components/midi_devices/meris_midi_io'
import MacrosContainer from '../components/macros_container'
// import BoardsContainer from '../components/boards_container'
import AccessMidi from '../hooks/access_midi'

export default function Home() {
	const midiObject = AccessMidi();
  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <div>
        {MacrosContainer(midiObject)}
      </div>
    </div>
  )
}