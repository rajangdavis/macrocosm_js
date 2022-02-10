import {createContext} from 'react'
import useLocalStorage from './use_local_storage'
import defaultConfig from "../factory_presets/factory_presets"

const FactoryPresetsContext = createContext(defaultConfig);

const FactoryPresetsProvider = ({children, initialConfig= defaultConfig })=>{
	
	const [factoryPresets, setFactoryPresets] = useLocalStorage('presets_state', defaultConfig);
	const updateFactoryPresets = (key, value) => {
		let copiedConfig = {...factoryPresets}
		copiedConfig[key] = value
		setFactoryPresets(copiedConfig)
	}
	
	return (
		<FactoryPresetsContext.Provider value={{ factoryPresets, updateFactoryPresets}}>
			{children}
		</FactoryPresetsContext.Provider>
	)
}

module.exports = {
	FactoryPresetsContext: FactoryPresetsContext,
	FactoryPresetsProvider: FactoryPresetsProvider
}