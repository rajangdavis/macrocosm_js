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
		<div className="text-center scale-type">
			<div className="flex-row">
				<SmallPadButton 
					label="&#9651;"
					className={isSelected(0, 19)}
					onClick={()=> setScaleType(0)}/>
				<SmallPadButton 
					label="—"
					className={isSelected(20, 39)}
					onClick={()=> setScaleType(39)}/>
				<SmallPadButton 
					label="mel—"
					className={isSelected(40, 59)}
					onClick={()=> setScaleType(59)}/>
			</div>
			<div className="flex-row">
				<SmallPadButton 
					label="har—"
					className={isSelected(60, 79)}
					onClick={()=> setScaleType(79)}/>
				<SmallPadButton 
					label="dblhar—"
					className={isSelected(80, 99)}
					onClick={()=> setScaleType(99)}/>
				<SmallPadButton 
					label="&#9651;#11P"
					className={isSelected(100, 120)}
					onClick={()=> setScaleType(120)}/>
			</div>
			<div className="flex-row text-reset">
				<SmallPadButton 
					label="—P"
					className={isSelected(121, 127)}
					onClick={()=> setScaleType(127)}/>
			</div>
			<label>Scale Type</label>
		</div>
	)
}