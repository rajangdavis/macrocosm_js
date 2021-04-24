import {WidePadButton} from '../pad_button'
import {useState} from 'react'

export default function EnvelopeType(props){
	const [envelopeType, setEnvelopeType] = useState(null);

	const isSelected = (val)=>{
		return envelopeType == val ? 'selected' : ''
	}
	return(
		<div className="text-center envelope-type">
			<WidePadButton 
				label="Triggered" 
				className={isSelected(63)} 
				onClick={()=> setEnvelopeType(63)}/>
			<WidePadButton 
				label="Follower"
				className={isSelected(64)} 
				onClick={()=> setEnvelopeType(64)}/>
			<label>Envelope Type</label>
		</div>
	)
}