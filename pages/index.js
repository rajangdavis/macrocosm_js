import Head from 'next/head'
import PedalSelector from '../components/pedal_selector'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <PedalSelector />
    </div>
  )
}
