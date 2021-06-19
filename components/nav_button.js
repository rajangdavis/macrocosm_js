import {useState, useContext} from 'react'
import {MidiConfigContext} from '../hooks/midi_config'

export default function NavButton(props){
	const {midiConfig} = useContext(MidiConfigContext)
	let className = props.headerOpen ? "nav-button open" : "nav-button closed"
	let noOutput = midiConfig.output == ""
	let openOrClose = ()=> {
		props.setHeaderOpen(!props.headerOpen)	
	}

  return (
		<div className={className} onClick={openOrClose}>
			<div className="line first"></div>
			{(!props.headerOpen && noOutput) && <span class="red-dot"></span>}
			{!props.headerOpen && <div className="line"></div>}
			<div className="line second"></div>
		</div>
  )
}
