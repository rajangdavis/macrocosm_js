import * as style from './knob_styles'

module.exports = {
	LittleKnob: (props) => {
		let newProps = {
			...props, 
			knobContainer: style.littleKnobContainer,
			knobFunction: style.littleKnob,
			hiddenKnob: style.hiddenLittleKnob
		}
		return Knob(newProps)
	},
	BigKnob: (props) => {
		let newProps = {
			...props, 
			knobContainer: style.bigKnobContainer,
			knobFunction: style.bigKnob,
			hiddenKnob: style.hiddenBigKnob
		}
		return Knob(newProps)
	},
} 


function Knob(props){

	const updateVal = (event) => {
	  props.setVal(parseInt(event.target.value));
	}

	const angleCalc = (intValue)=>{
		return ((298/127)*intValue)-149;
	}
	
	return(
		<div className={`knob ${props.className}`} style={props.knobContainer}>
			<div style={props.knobFunction(angleCalc(props.val))}>
				<div style={style.knobDial}></div>
			</div>
			<div style={style.textLabel}>
				<span>{props.label}</span>
			</div>
			<input 
	      type="range" 
	      min="0" 
	      max="127"
	      value={props.val}
	      style={style.inputRange(props.sliderData)}
	      onChange={updateVal}
	      onClickCapture={updateVal}/>
		</div>
	)

}