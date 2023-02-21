import { useReducer } from "react";

export default function MerisState(initialState) {
  let reducer = (state, action) => {
    return {
      ...state,
      [action.key]: action.value,
    };
  };
  return useReducer(reducer, initialState);
}
