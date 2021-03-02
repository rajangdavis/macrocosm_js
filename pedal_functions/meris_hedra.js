module.exports = {
	// EXPRESSION: {
	// 	ccValue: 4,
	// 	type: 'knob',
	// 	label: 'Expression Pedal'
	// },
	// HALF_SPEED_ENABLE: {
	// 	ccValue: 9,
	// 	label: 'Half Speed Enable',
	// 	type: 'button',
	// 	toggleValues: [63, 64]
	// },
	// TEMPO: {
	// 	ccValue: 15,
	// 	type: 'knob',
	// 	label: 'Tempo (to millisec intervals)'
	// },
	KEY: {
		ccValue: 16,
		type: 'knob',
		label: 'Key',
		className: 'left-top'
	},
	MICRO_TUNE: {
		ccValue: 17,
		type: 'knob',
		label: 'Micro Tune',
		className: 'center-top'
	},
	MIX: {
		ccValue: 18,
		type: 'knob',
		label: 'Mix',
		className: 'right-top'
	},
	PITCH_1: {
		ccValue: 19,
		type: 'knob',
		label: 'Pitch 1',
		className: 'left-middle'
	},
	PITCH_2: {
		ccValue: 20,
		type: 'knob',
		label: 'Pitch 2',
		className: 'center-middle'
	},
	PITCH_3: {
		ccValue: 21,
		type: 'knob',
		label: 'Pitch 3',
		className: 'right-middle'
	},
	DELAY_MODE:{
		ccValue: 29,
		label: 'Delay Mode',
		type: 'groupable_button',
		className: 'right-above-bypass',
		values: [
			{
				label: 'Series + Pitch Feedback',
				value: 0
			},
			{
				label: 'Series',
				value: 63
			},
			{
				label: 'Dual + Cross Feedback',
				value: 95
			},
			{
				label: 'Dual',
				value: 127
			},
		]
	},
	BYPASS: {
		ccValue: 14,
		label: 'Bypass',
		type: 'button',
		toggleValues: [0, 127],
		className: 'right-bottom'
	},
	// SCALE_TYPE: {
	// 	ccValue: 22,
	// 	type: 'knob',
	// 	label: 'Scale Type'
	// },
	// PITCH_CORRECTION_AND_GLIDE: {
	// 	ccValue: 23,
	// 	type: 'knob',
	// 	label: 'Pitch Correction and Glide'
	// },
	// FEEDBACK: {
	// 	ccValue: 24,
	// 	type: 'knob',
	// 	label: 'Feedback'
	// },
	// TIME_DIVISION_1: {
	// 	ccValue: 25,
	// 	type: 'knob',
	// 	label: 'Time Division 1'
	// },
	// TIME_DIVISION_2: {
	// 	ccValue: 26,
	// 	type: 'knob',
	// 	label: 'Time Division 2'
	// },
	// TIME_DIVISION_3: {
	// 	ccValue: 27,
	// 	type: 'knob',
	// 	label: 'Time Division 3'
	// },
	TAP: {
		ccValue: 28,
		label: 'Tap',
		type: 'button',
		value: 127,
		className: 'left-bottom'
	},
	// PITCH_CONTROL_SMOOTHING: {
	// 	ccValue: 30,
	// 	label: 'Pitch Control Smoothing',
	// 	type: 'groupable_button',
	// 	values: [
	// 		{
	// 			label: 'Smoothing On',
	// 			value: 0
	// 		},
	// 		{
	// 			label: 'Smoothing Off',
	// 			value: 127
	// 		}
	// 	]
	// },
	// VOLUME_SWELL_ENABLE:{
	// 	ccValue: 31,
	// 	label: 'Volume Swell Enable',
	// 	type: 'groupable_button',
	// 	values: [
	// 		{
	// 			label: 'Swell On',
	// 			value: 0
	// 		},
	// 		{
	// 			label: 'Swell Off',
	// 			value: 127
	// 		}
	// 	]
	// }
}