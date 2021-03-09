import AddRemovePattern from '../hooks/add_remove_pattern'
import MacroButton from '../components/macro_button'

export default function MacrosContainer(midiObject){

  const returnNewMacro = (state)=>{
    return {
      id: Date.now(),
      name: `Macro ${state.length + 1}`,
      pedals: []
    }
  }

  const [state, dispatch] = AddRemovePattern(returnNewMacro);

  return <div className='macros-container'>
    <h1>Macros</h1>
    {state.map(item =>(
      <div key={item.id}>{MacroButton({midiObject: midiObject, buttonData: item, dispatch: dispatch})}</div>
    ))}
    <div onClick={() => dispatch({type: 'add'})}>
      Add Macro
    </div>
  </div>
  
}


