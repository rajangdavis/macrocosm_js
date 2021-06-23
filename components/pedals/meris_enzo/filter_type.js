import {SmallPadButton} from '../pad_button'

export default function FilterType(props){
	
	const isSelected = (lb, ub)=>{
		let lowerBoundCheck = (lb <= props.filterType)
		let upperBoundCheck = (props.filterType <= ub)
		let withinBounds = lowerBoundCheck && upperBoundCheck
		let withinBoundsAndNotNull = props.filterType != null && withinBounds
		return (withinBoundsAndNotNull ? 'selected' : '')
	}

	const setFilterType = (value)=>{
		props.enzoDispatch({key: 'filterType', value: value})
	}
	return (
		<div className="text-center filter-type">
			<div className="flex-row">
				<SmallPadButton 
					label="LP"
					className={isSelected(0, 4)}
					onClick={()=> setFilterType(0)}/>
				<SmallPadButton 
					label="BP"
					className={isSelected(5, 32)}
					onClick={()=> setFilterType(32)}/>
				<SmallPadButton 
					label="HP"
					className={isSelected(33, 59)}
					onClick={()=> setFilterType(59)}/>
			</div>
			<div className="flex-row text-reset">
				<SmallPadButton 
					label="v. LP"
					className={isSelected(60, 87)}
					onClick={()=> setFilterType(84)}/>
				<SmallPadButton 
					label="v. BP"
					className={isSelected(88, 115)}
					onClick={()=> setFilterType(115)}/>
				<SmallPadButton 
					label="v. HP"
					className={isSelected(116, 127)}
					onClick={()=> setFilterType(127)}/>
			</div>
			<label>Filter Type</label>
		</div>
	)
}