import * as HedraPedalFunctions from './pedal_functions/meris_hedra'
import HedraFactoryPresets from './factory_presets/meris_hedra'
import MerisInitialState from './meris_initial_state'

export default function MerisHedra(props){
	let initialState = MerisInitialState(props, HedraPedalFunctions);
	initialState.className = 'meris-hedra';
	initialState.label = 'Meris Hedra';
	initialState.pedalFunctions = HedraPedalFunctions;
	initialState.factoryPresets = HedraFactoryPresets;
	return initialState;
}
