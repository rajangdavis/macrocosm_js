import Link from 'next/link'
import useLocalStorage from '../hooks/use_local_storage'
import ManageMacroState from '../hooks/macro_state'
import { MidiConfigContext } from '../hooks/midi_config'
import { HandleMidiOutput } from "../hooks/midi_io"
import MacrosModal from '../components/macros_modal'
import MacrosModalEdit from '../components/macros_modal_edit'
import {useEffect, useContext, useState} from 'react'
import parseSysexToBinary from '../utilities/parse_sysex'

export default function Macros(props) {
	const {midiConfig} = useContext(MidiConfigContext)
	const {midiObject} = props;
	const [macrosModalOpen, setMacrosModalOpen] = useState(false);
	const [macrosModalEditOpen, setMacrosModalEditOpen] = useState(false);
	const [macroToEdit, setMacroToEdit] = useState(null);
	let [initialState, setState] = useLocalStorage('macro_state', [])
  let [macros, macroDispatch] = ManageMacroState(initialState);
  useEffect(() => {
    setState(macros)
  });
	
	const callMacro = async (macroData)=>{
		let macroSelectedPedals = macroData.pedals.filter(x => x.showing == true && x.selectedPreset != {})
		let notSelectedPedals = macroData.pedals.filter(x => x.showing == false)

		let macroMessageData = macroSelectedPedals.map((x) => {
			let message = parseSysexToBinary(x.selectedPreset.message)
			return { name: x.name, channel: midiConfig[`${x.name}Channel`], message: message }
		})

		let turnOffThesePedals = notSelectedPedals.map((x) => {
			return { name: x.name, channel: midiConfig[`${x.name}Channel`]};
		})

		let deviceOutput = midiObject.outputs.filter(x =>{
	    return x.name == midiConfig.output
	  })[0]
		
		if (deviceOutput){
			const results = await Promise.all(
				turnOffThesePedals.map(x => {console.log("TURNING OFF PEDAL: " + x.name); return deviceOutput.sendControlChange(14, 0, {channels: parseInt(x.channel)})}).concat(
				macroMessageData.map(x=> { console.log("TURNING ON PRESET: " + x.name); return [deviceOutput.sendControlChange(14, 127, {channels: parseInt(x.channel)}), deviceOutput.sendSysex(x.message.manufacturer, x.message.data)] }),
			));
			console.log(results)
		}
	}


	return (
		<div>
			<div className="view-port">
				<Link href="/pedals">Pedals</Link>
				<div className="main-display">
					{
						macros.map((macro, i) =>{
							return <div className="macro" key={i} onClick={()=>{callMacro(macro.data)}}>
											{macro.data.name}
											<a href="#" onClick={()=>{macroDispatch({type: 'remove-macro', macro_id: macro.macro_id }) } }>remove</a>
											|
											<a href="#" onClick={()=>{macroDispatch({type: 'clone-macro', macro_id: macro.macro_id }) } }>clone</a>
											|
											<a href="#" onClick={()=>{setMacroToEdit(macro); setMacrosModalEditOpen(true)} }>edit</a>
										</div>
						})
					}
				</div>
				<a href="#" onClick={()=>{setMacrosModalOpen(true)}}>Add</a>
			</div>
			{
        macrosModalOpen &&
        <MacrosModal
          macroDispatch={macroDispatch}
          setMacrosModalOpen={setMacrosModalOpen}
        />
      }
      {
				macrosModalEditOpen &&
        <MacrosModalEdit
          macroDispatch={macroDispatch}
          macroToEdit={macroToEdit}
          setMacroToEdit={setMacroToEdit}
          setMacrosModalOpen={setMacrosModalEditOpen}
        />
      }
		</div>
	);
}