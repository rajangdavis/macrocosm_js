import FirstRow from '../meris_enzo/first_row'
import SecondRow from '../meris_enzo/second_row'
import ThirdRow from '../meris_enzo/third_row'

export default function MerisEnzoLayout(props){

	return(
		<div className="meris-pedal meris-enzo-bigbox">
			{FirstRow(props)}
			{SecondRow(props)}
			{ThirdRow(props)}
		</div>
	)
}