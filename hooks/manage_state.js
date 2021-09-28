import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useImmerReducer } from "use-immer";
import { v4 as uuidv4 } from 'uuid';
export default function ManageState(initialState){

  let reducer = (state, action) =>{
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let createMacro = (state)=>{
      let initialState = {
        macro_id: uuidv4(),
        name: `Macro #${state.length + 1}`,
        midi_devices: [],
        open: true,
        order: state.length,
        show_midi_devices: false
      }
      state.push(initialState)
    }

    let cloneMacro = (state, action)=>{
      let [index, macro] = readMacro(state, action)
      let clone = cloneDeep(macro);
      let newMacroId = uuidv4();
      state.push(clone);
    }

    // READ
    let readMacro = (state, action)=>{
      let macro = state.filter( x => x.macro_id == action.macro_id)[0]
      let index = state.findIndex( x => x.macro_id == action.macro_id)
      return [index, macro];
    }

    // UPDATE
    let updateMacro = (state, action)=>{
      let [index, macro] = readMacro(state, action)
      macro[action.field] = action.new_value;
      state.splice(index, 1 , macro);
    }

    // DESTROY
    let removeMacro = (state, action)=>{
      return state.filter( x => x.macro_id != action.macro_id)
    }

    switch(action.type){
      case 'create-macro':
        return createMacro(state)
      case 'clone-macro':
        return cloneMacro(state, action)
      case 'update-macro':
        return updateMacro(state, action)
      case 'remove-macro':
        return removeMacro(state, action)
      default:
        throw new Error();
    }

	}
	return useImmerReducer(reducer, initialState)
}
