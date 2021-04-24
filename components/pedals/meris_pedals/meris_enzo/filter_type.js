import {SmallPadButton} from '../pad_button'
import {useState} from 'react'

export default function FilterType(props){
	const [filterType, setFilterType] = useState(null);

	const isSelected = (val)=>{
		return filterType == val ? 'selected' : ''
	}
	return (
		<div className="text-center filter-type">
			<div className="flex-row">
				<SmallPadButton 
					label="LP"
					className={isSelected(0)}
					onClick={()=> setFilterType(0)}/>
				<SmallPadButton 
					label="BP"
					className={isSelected(32)}
					onClick={()=> setFilterType(32)}/>
				<SmallPadButton 
					label="HP"
					className={isSelected(59)}
					onClick={()=> setFilterType(59)}/>
			</div>
			<div className="flex-row text-reset">
				<SmallPadButton 
					label="v. LP"
					className={isSelected(87)}
					onClick={()=> setFilterType(87)}/>
				<SmallPadButton 
					label="v. BP"
					className={isSelected(115)}
					onClick={()=> setFilterType(115)}/>
				<SmallPadButton 
					label="v. HP"
					className={isSelected(127)}
					onClick={()=> setFilterType(127)}/>
			</div>
			<label>Filter Type</label>
		</div>
	)
}