import {SmallPadButton} from '../pad_button'

export default function PitchControlSmoothing(props){

	const isSelected = (value)=>{
		return props.pitchControlSmoothing == value ? 'selected' : ''
	}

	const setPitchControlSmoothing = (value)=>{
		props.dispatch({key: 30, value: value})
	}
	return(
		<div className="text-center">
			<div className="flex-row">
				<SmallPadButton 
					label="On"
					className={isSelected(127)} 
					onClick={()=> setPitchControlSmoothing(127)}/>
				<SmallPadButton 
					label="Off"
					className={isSelected(0)} 
					onClick={()=> setPitchControlSmoothing(0)}/>
			</div>
			<label>Pitch Control Smoothing</label>
		</div>
	)
}