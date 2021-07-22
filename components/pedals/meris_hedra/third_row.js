import {LittleKnob} from '../knob'
import DelayMode from './delay_mode'
import Bypass from '../bypass'

export default function ThirdRow(props){
	let {
		14:bypass,
		25:timeDivision1,
		26:timeDivision2,
		27:timeDivision3,
		29:delayMode,
	} = props.hedraState;
	
	let setTimeDivision1 = (value) =>{ 
		props.hedraDispatch({key: 'timeDivision1', value: value})
	}

	let setTimeDivision2 = (value) =>{ 
		props.hedraDispatch({key: 'timeDivision2', value: value})
	}

	let setTimeDivision3 = (value) =>{ 
		props.hedraDispatch({key: 'timeDivision3', value: value})
	}
	
	return(
		<div className="flex-row">
			<div className="flex-row middle-controls">
				<LittleKnob
					className=""
					label="Time Division 1" 
					setVal={setTimeDivision1} 
					val={timeDivision1} 
					sliderData={props.sliderData}/>
					<LittleKnob
						className=""
						label="Time Division 2" 
						setVal={setTimeDivision2} 
						val={timeDivision2} 
						sliderData={props.sliderData}/>
					<LittleKnob
						className=""
						label="Time Division 3" 
						setVal={setTimeDivision3} 
						val={timeDivision3} 
						sliderData={props.sliderData}/>
			</div>
			<div className="right-side-controls">
				<div className="flex-row first-row">
					<DelayMode
						hedraDispatch={props.hedraDispatch}
						delayMode={delayMode}
					/>
				</div>
				<Bypass bypass={bypass} dispatch={props.hedraDispatch}/>
			</div>
		</div>
	)
}