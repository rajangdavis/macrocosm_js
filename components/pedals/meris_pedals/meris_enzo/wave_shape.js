import {SmallPadButton} from '../pad_button'
import {useState} from 'react'

export default function WaveShape(props){
	const [waveShape, setWaveShape] = useState(null);

	const isSelected = (val)=>{
		return waveShape == val ? 'selected' : ''
	}

	return(
		<div className="text-center wave-shape">
			<SmallPadButton 
				className={isSelected(0)} 
				onClick={()=> setWaveShape(0)}
				label="SAW"/>
			<SmallPadButton 
				className={isSelected(127)} 
				onClick={()=> setWaveShape(127)}
				label="SQUARE"/>
			<label>Waveshape</label>
		</div>
	)

}