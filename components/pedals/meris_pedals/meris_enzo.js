import * as EnzoPedalFunctions from './pedal_functions/meris_enzo'
import EnzoFactoryPresets from './factory_presets/meris_enzo'
import MerisInitialState from './meris_initial_state'

export default function MerisEnzo(props){
	let initialState = MerisInitialState(props, EnzoPedalFunctions);
	initialState.className = 'meris-enzo';
	initialState.label = 'Meris Enzo';
	initialState.pedalFunctions = EnzoPedalFunctions;
	initialState.factoryPresets = EnzoFactoryPresets;
  return initialState;
}
