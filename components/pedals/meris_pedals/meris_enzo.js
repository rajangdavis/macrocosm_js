import MerisGenericLayout from './meris_generic_layout'
import MerisComputedFunctions from './meris_computed_functions'
import * as EnzoPedalFunctions from '../../../pedal_functions/meris_enzo'
import MerisInitialState from './meris_initial_state'

export default function MerisEnzo(props){
	let initialState = MerisInitialState(props, EnzoPedalFunctions);
	initialState.className = 'meris-enzo';
	initialState.label = 'Meris Enzo';
	initialState.computedFunctions = MerisComputedFunctions;
	initialState.pedalFunctions = EnzoPedalFunctions;
  initialState.component = MerisGenericLayout;
  return initialState;
}
