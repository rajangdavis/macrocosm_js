import Link from 'next/link'
import useLocalStorage from '../hooks/use_local_storage'
import {MidiConfigContext} from '../hooks/midi_config'
import { HandleMidiOutput } from "../hooks/midi_io"
import {useEffect, useContext} from 'react'
import parseSysexToBinary from '../utilities/parse_sysex'

export default function Macros(props) {
	const {midiConfig} = useContext(MidiConfigContext)

	let macro = [
		JSON.parse(window.localStorage.getItem('hedra_presets'))[0].message,
		JSON.parse(window.localStorage.getItem('enzo_presets'))[0].message
	]

	return (
		<div>
			<h1>Macros</h1>
			<div>
				<Link href="/">Presets</Link>

			</div>
		</div>
	);
}