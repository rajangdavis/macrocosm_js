module.exports = {
	// EXPRESSION: {
	// 	ccValue: 4,
	// 	type: 'knob',
	// 	label: 'Expression Pedal'
	// },
	// TEMPO: {
	// 	ccValue: 15,
	// 	type: 'knob',
	// 	label: 'Tempo (to millisec intervals)'
	// },
	TIME: {
		ccValue: 16,
		type: 'knob',
		label: 'Time',
		className: 'left-top'
	},
	FEEDBACK: {
		ccValue: 17,
		type: 'knob',
		label: 'Feedback',
		className: 'center-top'
	},
	MIX: {
		ccValue: 18,
		type: 'knob',
		label: 'Mix',
		className: 'right-top'
	},
	MULTIPLY: {
		ccValue: 19,
		type: 'knob',
		label: 'Multiply',
		className: 'left-middle'
	},
	DIMENSION: {
		ccValue: 20,
		type: 'knob',
		label: 'Dimension',
		className: 'center-middle'
	},
	DYNAMICS: {
		ccValue: 21,
		type: 'knob',
		label: 'Dynamics',
		className: 'right-middle'
	},
	PHASER_MODE:{
		ccValue: 29,
		label: 'Phaser Mode',
		type: 'groupable_button',
		className: 'right-above-bypass',
		values: [
			{
				label: 'Off',
				value: 0
			},
			{
				label: 'Slow',
				value: 63
			},
			{
				label: 'Whole Note',
				value: 95
			},
			{
				label: 'Quarter Note',
				value: 127
			},
		]
	},
	BYPASS: {
		ccValue: 14,
		label: 'Bypass',
		type: 'button',
		className: 'right-bottom',
		toggleValues: [0, 127]
	},
	EARLY_MODULATIONS: {
		ccValue: 22,
		type: 'knob',
		label: 'Early Modulations',
		className: 'alt-left-top'
	},
	FEEDBACK_FILTER: {
		ccValue: 23,
		type: 'knob',
		label: 'Feedback Filter',
		className: 'alt-center-top'
	},
	DELAY_LEVEL: {
		ccValue: 24,
		type: 'knob',
		label: 'Delay Level',
		className: 'alt-right-top'
	},
	LATE_MODULATION: {
		ccValue: 25,
		type: 'knob',
		label: 'Late Modulation',
		className: 'alt-left-middle'
	},
	DYNAMIC_FLANGER_MODE: {
		ccValue: 26,
		type: 'knob',
		label: 'Dynamic Flanger Mode',
		className: 'alt-center-middle'
	},
	DYNAMIC_FLANGER_SPEED: {
		ccValue: 27,
		type: 'knob',
		label: 'Dynamic Flanger Speed',
		className: 'alt-right-middle'
	},
	PHASER_MODE_:{
		ccValue: 29,
		label: 'Phaser Mode',
		type: 'groupable_button',
		className: 'alt-right-above-bypass',
		values: [
			{
				label: 'Off',
				value: 0
			},
			{
				label: 'Slow',
				value: 63
			},
			{
				label: 'Whole Note',
				value: 95
			},
			{
				label: 'Quarter Note',
				value: 127
			},
		]
	},
	FLANGER_FEEDBACK: {
		ccValue: 30,
		label: 'Flanger Feedback',
		type: 'groupable_button',
		values: [
			{
				label: 'On',
				value: 0
			},
			{
				label: 'Off',
				value: 127
			}
		],
		className: 'alt-right-bottom',
	},
	ALT: {
		label: 'Alt',
		type: 'button',
		alt: true,
		className: 'left-above-tap'
	},
	TAP: {
		ccValue: 28,
		label: 'Tap',
		type: 'button',
		value: 127,
		className: 'left-bottom'
	},
	ALT_: {
		label: 'Alt',
		type: 'button',
		alt: true,
		className: 'alt-left-above-tap active'
	},
	ENVELOPE_TYPE: {
		ccValue: 9,
		label: 'Envelope Type',
		type: 'button',
		toggleValues: [63, 64],
		className: 'alt-left-bottom'
	},
}