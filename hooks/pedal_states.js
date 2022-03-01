import {useState, createContext} from 'react'
import defaultConfig from "../data/pedal_states"

const PedalStatesContext = createContext(defaultConfig);

const PedalStatesProvider = ({children, initialConfig= defaultConfig })=>{
	
	const [factoryPresets, setPedalStates] = useState(defaultConfig);
	const updatePedalStates = (key, value) => {
		let copiedConfig = {...factoryPresets}
		copiedConfig[key] = value
		setPedalStates(copiedConfig)
	}
	
	return (
		<PedalStatesContext.Provider value={{ factoryPresets, updatePedalStates}}>
			{children}
		</PedalStatesContext.Provider>
	)
}

module.exports = {
	PedalStatesContext: PedalStatesContext,
	PedalStatesProvider: PedalStatesProvider
}