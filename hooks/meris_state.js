import { useImmerReducer } from "use-immer";
import { HandleMidiOutput } from "./midi_io"

export default function MerisState(initialState, props = {}){

  let reducer = (state, action) =>{
    HandleMidiOutput(state, action, props);
    state[action.key].value = action.value
  }

	return useImmerReducer(reducer, initialState)
}
