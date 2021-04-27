import {SmallPadButton} from './pad_button'

export default function Bypass(props){

	const isSelected = (value)=>{
		return props.bypass == value ? 'selected' : ''
	}

	const setBypass = (value)=>{
		props.enzoDispatch({key: 'bypass', value: value})
	}
	return(
		<div className="text-center bypass">
			<div className="flex-row">
				<SmallPadButton 
					label="On"
					className={isSelected(127)} 
					onClick={()=> setBypass(127)}/>
				<SmallPadButton 
					label="Off"
					className={isSelected(0)} 
					onClick={()=> setBypass(0)}/>
			</div>
			<label>Bypass</label>
		</div>
	)
}