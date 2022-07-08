import { useImmerReducer } from "use-immer";

export default function MerisState(initialState) {
  let reducer = (state, action) => {
    state[action.key] = action.value;
    return state;
  };
  return useImmerReducer(reducer, initialState);
}
