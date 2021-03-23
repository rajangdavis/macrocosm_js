import Head from 'next/head'
// import BoardsContainer from '../components/boards_container'
import MacrosContainer from '../components/macros_container'
import AccessMidi from '../hooks/access_midi'
import ManageState from '../hooks/manage_state'
import useLocalStorage from '../hooks/use_local_storage'
import {useEffect} from 'react'

export default function Home() {
	const midiObject = AccessMidi();
  let [initialState, setState] = useLocalStorage('state', [])
  useEffect(() => {
    setState(Macros)
  });
  let [Macros, MacroDispatch] = ManageState(initialState);
  let hooks = [midiObject, Macros, MacroDispatch];

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
      </Head>
      <div>
        {MacrosContainer(hooks)}
      </div>
    </div>
  )
}