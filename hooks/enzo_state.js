import { useImmerReducer } from "use-immer";

export default function EnzoState(initialState, midiObject = {}){

  let reducer = (state, action) =>{
    state[action.key] = action.value
  }

	return useImmerReducer(reducer, initialState)
}
