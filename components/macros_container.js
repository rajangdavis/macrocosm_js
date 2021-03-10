import ManageMacros from '../hooks/manage_macros'
import MacroButton from '../components/macro_button'

export default function MacrosContainer(midiObject){
  const [state, dispatch] = ManageMacros();

  return <div className='macros-container'>
    <h1>Macros</h1>
    {state.map(item =>(
      <div key={item.macro_id}>{MacroButton({midiObject: midiObject, buttonData: item, dispatch: dispatch})}</div>
    ))}
    <div onClick={() => dispatch({type: 'add-macro'})}>
      Add Macro
    </div>
  </div>
  
}


