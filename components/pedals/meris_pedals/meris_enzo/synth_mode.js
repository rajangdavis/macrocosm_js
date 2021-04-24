import {SmallPadButton} from '../pad_button'
import {useState} from 'react'

export default function SynthMode(props){
	const [synthMode, setSynthMode] = useState(null);

	const isSelected = (val)=>{
		return synthMode == val ? 'selected' : ''
	}
	
	return(
		<div className="text-center synth-mode">
			<div className="flex-row">
				<SmallPadButton 
					onClick={()=> setSynthMode(127)}
					className={isSelected(127)}
					label="Poly"/>
				<SmallPadButton 
					onClick={()=> setSynthMode(63)}
					className={isSelected(63)}
					label="Mono"/>
			</div>
			<div className="flex-row">
				<SmallPadButton 
					onClick={()=> setSynthMode(95)}
					className={isSelected(95)}
					label="Arp"/>
				<SmallPadButton 
					onClick={()=> setSynthMode(0)}
					className={isSelected(0)}
					label="Dry"/>
			</div>
			<label>Synth Mode</label>
		</div>
	)

}