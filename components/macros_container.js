import ManageState from '../hooks/manage_state'
import {useState} from 'react'
import MacroButton from '../components/macro_button'

export default function MacrosContainer(midiObject){
  let [Macros, MacroDispatch] = ManageState();
  let [debugMode, setDebugMode] = useState(false);

  let debugModeClass = ()=> debugMode ?  '' : 'hidden'

  return <div className='macros-container'>
    <div onClick={() => setDebugMode(!debugMode)}>
      Debug Mode: {debugMode.toString()}
    </div>
    <h1>Macros</h1>
    {Macros.map(item =>(
      <div key={item.macro_id}>{MacroButton({
        midiObject: midiObject,
        buttonData: item,
        dispatch: MacroDispatch})}</div>
    ))}
    <div onClick={() => MacroDispatch({type: 'create-macro'})}>
      Add Macro
    </div>
    <div className={debugModeClass()}>
      <pre>
        {JSON.stringify(Macros, undefined, 2)}
      </pre>
    </div>
  </div>
  
}


