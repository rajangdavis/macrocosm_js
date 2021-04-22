import * as style from './big_knob_styles'

export default function BigKnob(props){
	
	const angleCalc = (intValue)=>{
		return ((298/127)*intValue)-149;
	}
	const updateVal = (event)=>{
	  let intValue = parseInt(event.target.value);
	  props.setVal(intValue);
	}
	
	return(
		<div className={props.className} style={style.bigKnobContainer}>
			<div style={style.bigKnob(angleCalc(props.val))}>
				<div style={style.knobDial}></div>
			</div>
			<div style={style.hiddenBigKnob}>
			</div>
			<div style={style.text}>{props.label}</div>
			<input 
             type="range" 
             min="1" 
             max="127"
             value={props.val}
             style={style.inputRange(props.sliderOpacity)}
             onChange={updateVal}
             onClickCapture={updateVal}/>
		</div>
	)

}