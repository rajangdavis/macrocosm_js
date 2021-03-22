import MerisGenericLayout from './meris_generic_layout'
import MerisComputedFunctions from './meris_computed_functions'
import * as PolymoonPedalFunctions from '../../../pedal_functions/meris_polymoon'
import MerisInitialState from './meris_initial_state'

export default function MerisPolymoon(props){
	let initialState = MerisInitialState(props, PolymoonPedalFunctions);
	initialState.className = 'meris-polymoon';
	initialState.label = 'Meris Polymoon';
	initialState.computedFunctions = MerisComputedFunctions;
	initialState.pedalFunctions = PolymoonPedalFunctions;
  initialState.component = MerisGenericLayout;
  return initialState;
}
