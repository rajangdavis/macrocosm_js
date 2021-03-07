import { useState } from 'react'
import MacroButton from '../components/macro_button'

export default function BoardsContainer(midiObject){
	const [boards, setBoards] = useState([]);
  const addToBoards = () =>{
    // let newBoards = boards.concat([MacroButton(midiObject, midiObject.inputValues, midiObject.outputValues)])
    // setBoards(newBoards)
    console.log("yo")
  }

  return <div className='boards-container'>
      <h1>Boards</h1>
      {boards.map((m,i )=>{
        return <div key={i}>{m}</div>
      })}
      <div onClick={addToBoards}>
        Add Boards
      </div>
    </div>
}
