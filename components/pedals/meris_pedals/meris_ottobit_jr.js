import * as OttobitJrPedalFunctions from './pedal_functions/meris_ottobit_jr'
import MerisInitialState from './meris_initial_state'

export default function MerisOttobitJr(props){
	let initialState = MerisInitialState(props, OttobitJrPedalFunctions);
	initialState.className = 'meris-ottobit-jr';
	initialState.label = 'Meris Ottobit Jr';
	initialState.pedalFunctions = OttobitJrPedalFunctions;
	return initialState;
}
