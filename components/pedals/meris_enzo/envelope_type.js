import {WidePadButton} from '../pad_button'
import {useState} from 'react'

export default function EnvelopeType(props){

	const isSelected = (val)=>{
		return props.envelopeType == val ? 'selected' : ''
	}

	const setEnvelopeType = (value)=>{
		props.enzoDispatch({key: 'envelopeType', value: value})
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