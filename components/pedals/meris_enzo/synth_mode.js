import {SmallPadButton} from '../pad_button'

export default function SynthMode(props){

	const isSelected = (value)=>{
		return props.synthMode == value ? 'selected' : ''
	}

	const setSynthMode = (value)=>{
		props.enzoDispatch({key: 'synthMode', value: value})
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