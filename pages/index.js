import Head from 'next/head'
// import MacrosContainer from '../components/macros_container'
// {MacrosContainer(midiObject)}
// import BoardsContainer from '../components/boards_container'
import AccessMidi from '../hooks/access_midi'
import MerisMidiIo from '../components/midi_devices/meris_midi_io'

export default function Home() {
	const midiObject = AccessMidi();
  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <div>
        <MerisMidiIo />
      </div>
    </div>
  )
}