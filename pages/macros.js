import Link from 'next/link'
import useLocalStorage from '../hooks/use_local_storage'
import {MidiConfigContext} from '../hooks/midi_config'
import { HandleMidiOutput } from "../hooks/midi_io"
import {useEffect, useContext} from 'react'
import parseSysexToBinary from '../utilities/parse_sysex'

export default function Macros(props) {
	const {midiConfig} = useContext(MidiConfigContext)
	const {midiObject} = props;

	const callMacro = async ()=>{
		let macroSelectedPedals = ['hedra', 'enzo']
		let notSelectedPedals = ['polymoon', 'mercury7', 'ottobitJr']
		let macroMessageData = macroSelectedPedals.map((x) => {
			return { name: x, message: parseSysexToBinary(JSON.parse(window.localStorage.getItem(`${x}_presets`))[0].message) }
		})

		let turnOffThesePedals = notSelectedPedals.map((x) => {
			return { name: x, channel: midiConfig[`${x}Channel`]};
		})

		let deviceOutput = midiObject.outputs.filter(x =>{
	    return x.name == midiConfig.output
	  })[0]
		
		if (deviceOutput){
			const results = await Promise.all(
				turnOffThesePedals.map(x => {console.log("TURNING OFF PEDAL: " + x.name); return deviceOutput.sendControlChange(14, 0, {channels: parseInt(x.channel)})}).concat(
				macroMessageData.map(x=> { console.log("TURNING ON PRESET: " + x.name); return deviceOutput.sendSysex(x.message.manufacturer, x.message.data) })
			));
			console.log(results)
		}
	}


	return (
		<div>
			<h1>Macros</h1>
			<div>
				<Link href="/">Presets</Link>
				<button onClick={callMacro}>Macro</button>
			</div>
		</div>
	);
}