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
	return(
		<div className="text-center">
			<div className={`pad-button ${props.className}`} 
					 style={props.style} 
					 onClick={props.onClick}
					 >

				{ props.label && 
					<label>{props.label}</label>
				}
			</div>
			{ props.bigButtonlabel && 
				<label>{props.bigButtonlabel}</label>
			}
		</div>
	)

}