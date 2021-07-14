import {SmallPadButton} from '../pad_button'

export default function ScaleType(props){
	
	const isSelected = (lb, ub)=>{
		let lowerBoundCheck = (lb <= props.scaleType)
		let upperBoundCheck = (props.scaleType <= ub)
		let withinBounds = lowerBoundCheck && upperBoundCheck
		let withinBoundsAndNotNull = props.scaleType != null && withinBounds
		return (withinBoundsAndNotNull ? 'selected' : '')
	}

	const setScaleType = (value)=>{
		props.hedraDispatch({key: 22, value: value})
	}
	return (
		<div className="text-center filter-type">
			<div className="flex-row">
				<SmallPadButton 
					label="LP"
					className={isSelected(0, 4)}
					onClick={()=> setScaleType(0)}/>
				<SmallPadButton 
					label="BP"
					className={isSelected(5, 32)}
					onClick={()=> setScaleType(32)}/>
				<SmallPadButton 
					label="HP"
					className={isSelected(33, 59)}
					onClick={()=> setScaleType(59)}/>
			</div>
			<div className="flex-row text-reset">
				<SmallPadButton 
					label="v. LP"
					className={isSelected(60, 87)}
					onClick={()=> setScaleType(84)}/>
				<SmallPadButton 
					label="v. BP"
					className={isSelected(88, 115)}
					onClick={()=> setScaleType(115)}/>
				<SmallPadButton 
					label="v. HP"
					className={isSelected(116, 127)}
					onClick={()=> setScaleType(127)}/>
			</div>
			<div className="flex-row text-reset">
				<SmallPadButton 
					label="v. BP"
					className={isSelected(88, 115)}
					onClick={()=> setScaleType(115)}/>
			</div>
			<label>Scale Type</label>
		</div>
	)
}