import {WidePadButton} from '../pad_button'

export default function ReverbAlgorithm(props){

	const isSelected = (value)=>{
		return props.reverbAlgorithm == value ? 'selected' : ''
	}

	const setPhaserMode = (value)=>{
		props.mercury7Dispatch({key: 29, value: value})
	}
	
	return(
		<div className="text-center algorithm">
			<WidePadButton
				onClick={()=> setPhaserMode(63)}
				className={isSelected(63)}
				label="Cathedra"/>
			<WidePadButton
				onClick={()=> setPhaserMode(0)}
				className={isSelected(0)}
				label="Utlraplate"/>
			<label>Algorithm</label>
		</div>
	)

}