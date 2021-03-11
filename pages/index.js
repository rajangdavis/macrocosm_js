import Head from 'next/head'
// import MacrosContainer from '../components/macros_container'
// {MacrosContainer(midiObject)}
// import BoardsContainer from '../components/boards_container'
import AccessMidi from '../hooks/access_midi'
import MerisEnzo from '../components/meris_pedals/meris_enzo'

export default function Home() {
	const midiObject = AccessMidi();
  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <div>
        <MerisEnzo midiObject={midiObject} inputPort={1} outputPort={1} />
      </div>
    </div>
  )
}