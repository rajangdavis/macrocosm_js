import ManageMacros from '../hooks/manage_macros'
import MacroButton from '../components/macro_button'

export default function MacrosContainer(midiObject){
  const [Macros, MacroDispatch] = ManageMacros();

  return <div className='macros-container'>
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
    <div>
      {JSON.stringify(Macros)}
    </div>
  </div>
  
}


