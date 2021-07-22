import {SmallPadButton} from '../pad_button'

export default function HalfspeedEnable(props){

	const isSelected = (value)=>{
		return props.halfspeedEnable == value ? 'selected' : ''
	}

	const setHalfspeedEnable = (value)=>{
		props.dispatch({key: 9, value: value})
	}
	return(
		<div className="text-center">
			<div className="flex-row">
				<SmallPadButton 
					label="On"
					className={isSelected(127)} 
					onClick={()=> setHalfspeedEnable(127)}/>
				<SmallPadButton 
					label="Off"
					className={isSelected(0)} 
					onClick={()=> setHalfspeedEnable(0)}/>
			</div>
			<label>Halfspeed Enable</label>
		</div>
	)
}