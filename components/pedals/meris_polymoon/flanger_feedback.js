import {SmallPadButton} from '../pad_button'
import {useState} from 'react'

export default function FlangerFeedback(props){

	const isSelected = (lb, ub)=>{
		let lowerBoundCheck = (lb <= props.flangerFeedback)
		let upperBoundCheck = (props.flangerFeedback <= ub)
		let withinBounds = lowerBoundCheck && upperBoundCheck
		let withinBoundsAndNotNull = props.flangerFeedback != null && withinBounds
		return (withinBoundsAndNotNull ? 'selected' : '')
	}

	const setFlangerFeedback = (value)=>{
		props.polymoonDispatch({key: 30, value: value})
	}

	return(
		<div className="text-center flanger-feedback">
			<SmallPadButton 
				label="ON"
				className={isSelected(64, 127)}
				onClick={()=> setFlangerFeedback(64)}/>
			<SmallPadButton 
				label="OFF" 
				className={isSelected(0, 63)}
				onClick={()=> setFlangerFeedback(63)}/>
			<label>Flanger Feedback</label>
		</div>
	)
}