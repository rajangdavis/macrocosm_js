import { useReducer } from 'react'

export default function AddRemovePattern(newState){
	const initialState = []
	const reducer = (state, action)=>{
    switch(action.type){
      case 'add':
        return [ ...state, newState]
      case 'remove':
        return [...state.filter( x => x.id != action.id)]
      default:
        throw new Error();
    }
	}
	return useReducer(reducer, initialState);
}
