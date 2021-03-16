import Head from 'next/head'
// import MacrosContainer from '../components/macros_container'
// {MacrosContainer(midiObject)}
// import BoardsContainer from '../components/boards_container'
import MerisEnzo from '../components/pedals/meris_pedals/meris_enzo'
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
        <MerisMidiIo midiObject={midiObject}/>
      </div>
    </div>
  )
}