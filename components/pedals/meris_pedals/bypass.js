import {SmallPadButton} from './pad_button'
import {useState} from 'react'

export default function Bypass(props){
	const [bypass, setBypass] = useState(null);

	const isSelected = (val)=>{
		return bypass == val ? 'selected' : ''
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