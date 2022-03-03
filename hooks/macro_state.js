import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import { useImmerReducer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
export default function ManageMacroState(initialState) {
  let reducer = (state, action) => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let createMacro = (state, action) => {
      let initialState = {
        macro_id: uuidv4(),
        ...action,
      };
      delete initialState.type;
      state.push(initialState);
    };

    let cloneMacro = (state, action) => {
      let [index, macro] = readMacro(state, action);
      let clone = cloneDeep(macro);
      clone.macro_id = uuidv4();
      clone.data.name = `Clone of ${clone.data.name}`;
      state.push(clone);
    };

    // READ
    let readMacro = (state, action) => {
      let macro = state.filter((x) => x.macro_id == action.macro_id)[0];
      let index = state.findIndex((x) => x.macro_id == action.macro_id);
      return [index, macro];
    };

    // UPDATE
    let updateMacro = (state, action) => {
      let [index, macro] = readMacro(state, action);
      macro.data = action.data;
      state.splice(index, 1, macro);
    };

    // DESTROY
    let removeMacro = (state, action) => {
      return state.filter((x) => x.macro_id != action.macro_id);
    };

    switch (action.type) {
      case "create-macro":
        return createMacro(state, action);
      case "clone-macro":
        return cloneMacro(state, action);
      case "update-macro":
        return updateMacro(state, action);
      case "remove-macro":
        return removeMacro(state, action);
      default:
        throw new Error();
    }
  };
  return useImmerReducer(reducer, initialState);
}
