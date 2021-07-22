import {WidePadButton} from '../pad_button'
import {useState} from 'react'

export default function DelayMode(props){

	const isSelected = (lb, ub)=>{
		let lowerBoundCheck = (lb <= props.delayMode)
		let upperBoundCheck = (props.delayMode <= ub)
		let withinBounds = lowerBoundCheck && upperBoundCheck
		let withinBoundsAndNotNull = props.delayMode != null && withinBounds
		return (withinBoundsAndNotNull ? 'selected' : '')
	}

	const setDelayMode = (value)=>{
		props.hedraDispatch({key: 29, value: value})
	}

	return(
		<div className="text-center delay-mode">
			<div>
				<WidePadButton 
					label="series + pitch fdbk" 
					className={isSelected(0, 31)}
					onClick={()=> setDelayMode(0)}/>
				<WidePadButton 
					label="series"
					className={isSelected(32, 63)}
					onClick={()=> setDelayMode(63)}/>
			</div>
			<div>
				<WidePadButton 
					label="dual + cross fdbk" 
					className={isSelected(64, 95)}
					onClick={()=> setDelayMode(95)}/>
				<WidePadButton 
					label="dual"
					className={isSelected(96, 127)}
					onClick={()=> setDelayMode(127)}/>
			</div>
			<label>Delay Mode</label>
		</div>
	)
}