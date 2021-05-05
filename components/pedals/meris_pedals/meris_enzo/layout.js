import FirstRow from '../meris_enzo/first_row'
import SecondRow from '../meris_enzo/second_row'
import ThirdRow from '../meris_enzo/third_row'
import enzoInitialState from '../meris_enzo/initial_state'
import enzoStateReducer from '../../../../hooks/enzo_state'
import useLocalStorage from '../../../../hooks/use_local_storage'
import {useEffect} from 'react'

export default function MerisEnzoLayout(props){
	const [initialState, setState] = useLocalStorage('enzo_state', enzoInitialState)
  const [enzoState, enzoDispatch] = enzoStateReducer(initialState, props);
  useEffect(() => {
    setState(enzoState)
  });
	return(
		<div className="meris-pedal meris-enzo-bigbox">
			<FirstRow
				enzoState={enzoState}
				enzoDispatch={enzoDispatch}
				sliderData={props.sliderData}/>
			<SecondRow 
				enzoState={enzoState} 
				enzoDispatch={enzoDispatch} 
				sliderData={props.sliderData}/>
			<ThirdRow 
				enzoState={enzoState} 
				enzoDispatch={enzoDispatch} 
				sliderData={props.sliderData}/>
		</div>
	)
}