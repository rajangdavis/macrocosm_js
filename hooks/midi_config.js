import {createContext, useState} from 'react'

const defaultConfig = {
	output: '',
	enzoChannel: 1,
	enzoSysex: 3,
	hedraChannel: 2,
	hedraSysex: 4,
	polymoonChannel: 3,
	polymoonSysex: 2,
	mercury7Channel: 4,
	mercury7Sysex: 1,
	ottobitJrChannel: 5,
	ottobitJrSysex: 0,
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