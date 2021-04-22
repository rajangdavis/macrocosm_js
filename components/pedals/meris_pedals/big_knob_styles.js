module.exports = {
	bigKnobContainer: {
		position: 'relative',
		width: '118px',
		height: '118px',
	},
	knobDial: {
		position: 'absolute',
		zIndex: 2,
		borderLeft: '5px solid transparent',
  	borderRight: '5px solid transparent',
  	borderBottom: '14px solid white',
		left: '42.35%',
		right: '45.82%',
		top: '6.66%',
		bottom: '74.29%',
	},
	hiddenBigKnob:{
		zIndex: 1,
		position: "absolute",
		left: "11.48%",
		right: "14.95%",
		top: "0.09%",
		bottom: "25.69%",
		borderRadius: "50%",
		background: "radial-gradient(38.39% 37.72% at 50% 50%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 100%), #000000",
		boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.25)",
	},
	bigKnob: (rotationAngle)=>{
		return {
			zIndex: 2,
			position: "absolute",
			left: "11.48%",
			right: "14.95%",
			top: "0.09%",
			bottom: "25.69%",
			borderRadius: "50%",
			background: "radial-gradient(38.39% 37.72% at 50% 50%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 100%), #000000",
			transform: `rotate(${rotationAngle}deg)`
		}
	},
	inputRange: (opacity)=>{
		let decimalVal = opacity/100
		return{
			opacity: decimalVal,
			position: "relative",
	    zIndex: 3,
	    margin: "0 auto",
	    height: "80px"
		}
	},
	text: {
		zIndex: 2,
		position: "relative",
		textAlign: "center",
		top: "80%",
		margin: "0 auto",
	}
}