import MerisGenericLayout from './meris_generic_layout'
import MerisComputedFunctions from './meris_computed_functions'
import * as HedraPedalFunctions from '../../../pedal_functions/meris_hedra'
import MerisInitialState from './meris_initial_state'

export default function MerisHedra(props){
	let initialState = MerisInitialState(props, HedraPedalFunctions);
	initialState.className = 'meris-hedra';
	initialState.label = 'Meris Hedra';
	initialState.computedFunctions = MerisComputedFunctions;
	initialState.pedalFunctions = HedraPedalFunctions;
  initialState.component = MerisGenericLayout;
  return initialState;
}
