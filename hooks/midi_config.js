import {createContext, useState} from 'react'

const defaultConfig = {
	output: '',
	enzoChannel: 1,
	hedraChannel: 2,
	polymoonChannel: 3,
	mercury7Channel: 4,
	ottobitJrChannel: 5
}

const MidiConfigContext = createContext(defaultConfig);

const MidiConfigProvider = ({children, initialConfig= defaultConfig })=>{
	
	const [midiConfig, setMidiConfig] = useState(initialConfig)
	const updateConfig = (key, value) => {
		let copiedConfig = {...defaultConfig}
		copiedConfig[key] = value
		setMidiConfig(copiedConfig)
	}
	
	return (
		<MidiConfigContext.Provider value={{ midiConfig, updateConfig}}>
			{children}
		</MidiConfigContext.Provider>
	)
}

module.exports = {
	MidiConfigContext: MidiConfigContext,
	MidiConfigProvider: MidiConfigProvider
}