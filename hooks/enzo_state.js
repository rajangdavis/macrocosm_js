import { useImmerReducer } from "use-immer";
import { HandleMidiOutput } from "./midi_io"

export default function EnzoState(initialState, props = {}){

  let reducer = (state, action) =>{
    state[action.key].value = action.value
    HandleMidiOutput(state, action, props);
  }

	return useImmerReducer(reducer, initialState)
}
