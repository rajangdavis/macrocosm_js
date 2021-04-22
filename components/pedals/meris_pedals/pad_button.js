import * as style from './pad_button_styles'
import {useState} from 'react'

module.exports = {
	SmallPadButton: (props) => {
		let newProps = {...props, style: style.smallPadButton}
		return PadButton(newProps)
	},
	BigPadButton: (props) => {
		let newProps = {...props, style: style.bigPadButton}
		return PadButton(newProps)
	},
	WidePadButton: (props) => {
		let newProps = {...props, style: style.widePadButton}
		return PadButton(newProps)
	}
} 


function PadButton(props){

	const updateVal = (event)=>{
	  props.setVal(intValue);
	}

	// const changeStyles
	
	return(
		<div className={props.className} style={props.style} onClick={()=> console.log("sup")}>
		</div>
	)

}