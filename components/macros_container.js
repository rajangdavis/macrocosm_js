import {useState } from 'react'
import MacroButton from '../components/macro_button'

export default function MacrosContainer(midiObject){
  const [macros, setMacros] = useState([]);
  const addToMacros = () =>{
    let newMacros = macros.concat([MacroButton(midiObject, midiObject.inputValues, midiObject.outputValues)])
    setMacros(newMacros)
  }

  return <div className='macros-container'>
      <h1>Macros</h1>
      {macros.map((m,i )=>{
        return <div key={i}>{m}</div>
      })}
      <div onClick={addToMacros}>
        Add Macro
      </div>
    </div>
}
