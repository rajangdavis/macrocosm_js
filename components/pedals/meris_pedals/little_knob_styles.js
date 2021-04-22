module.exports = {
	littleKnobContainer: {
		position: 'relative',
		width: '132px',
		height: '95px',
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
		left: "22.31%",
		right: "33.06%",
		top: "0%",
		bottom: "37.54%",
		borderRadius: "50%",
		boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.25)",
	},
	littleKnob: (rotationAngle)=>{
		return {
			zIndex: 2,
			position: "absolute",
			left: "22.31%",
			right: "33.06%",
			top: "0%",
			bottom: "37.54%",
			borderRadius: "50%",
			background: "radial-gradient(38.39% 37.72% at 50% 50%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 100%), #000000",
			transform: `rotate(${rotationAngle}deg)`
		}
	},
	inputRange: {
		opacity: 0,
		position: "relative",
    zIndex: 3,
    margin: "0 auto",
    height: "80px"
	},
	text: {
		zIndex: 2,
		position: "relative",
		textAlign: "center",
		top: "80%",
		margin: "0 auto",
	}
}