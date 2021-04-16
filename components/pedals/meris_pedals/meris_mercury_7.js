import * as Mercury7PedalFunctions from './pedal_functions/meris_mercury_7'
import Mercury7FactoryPresets from './factory_presets/meris_mercury_7'
import MerisInitialState from './meris_initial_state'

export default function MerisMercury7(props){
  let initialState = MerisInitialState(props, Mercury7PedalFunctions);
	initialState.className = 'meris-mercury7';
	initialState.label = 'Meris Mercury7';
	initialState.pedalFunctions = Mercury7PedalFunctions;
	initialState.factoryPresets = Mercury7FactoryPresets;
	return initialState;
}
