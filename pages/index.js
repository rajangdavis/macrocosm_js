import Head from 'next/head'
import MacrosContainer from '../components/macros_container'
import BoardsContainer from '../components/boards_container'
import AccessMidi from '../hooks/access_midi'

export default function Home() {
	const midiObject = AccessMidi();
  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
			{MacrosContainer(midiObject)}
      {BoardsContainer(midiObject)}
    </div>
  )
}