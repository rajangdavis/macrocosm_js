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
	SAMPLE_RATE: {
		ccValue: 16,
		type: 'knob',
		label: 'Rate',
		className: 'left-top'
	},
	FILTER: {
		ccValue: 17,
		type: 'knob',
		label: 'Filter',
		className: 'center-top'
	},
	BITS: {
		ccValue: 18,
		type: 'knob',
		label: 'Bits',
		className: 'right-top'
	},
	STUTTER: {
		ccValue: 19,
		type: 'knob',
		label: 'Stutter',
		className: 'left-middle'
	},
	SEQUENCER: {
		ccValue: 20,
		type: 'knob',
		label: 'Sequencer',
		className: 'center-middle'
	},
	SEQUENCER_MULT: {
		ccValue: 21,
		type: 'knob',
		label: 'Multiplier',
		className: 'right-middle'
	},
	SEQUENCER_TYPE:{
		ccValue: 29,
		label: 'Sequencer Type',
		type: 'groupable_button',
		className: 'right-above-bypass',
		values: [
			{
				label: 'Pitch',
				value: 0
			},
			{
				label: 'Sample Rate',
				value: 63
			},
			{
				label: 'Filter',
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
	STEP_1: {
		ccValue: 22,
		type: 'knob',
		label: 'Step 1',
		className: 'alt-left-top'
	},
	STEP_2: {
		ccValue: 23,
		type: 'knob',
		label: 'Step 2',
		className: 'alt-center-top'
	},
	STEP_3: {
		ccValue: 24,
		type: 'knob',
		label: 'Step 3',
		className: 'alt-right-top'
	},
	STEP_4: {
		ccValue: 25,
		type: 'knob',
		label: 'Step 4',
		className: 'alt-left-middle'
	},
	STEP_5: {
		ccValue: 26,
		type: 'knob',
		label: 'Step 5',
		className: 'alt-center-middle'
	},
	STEP_6: {
		ccValue: 27,
		type: 'knob',
		label: 'Step 6',
		className: 'alt-right-middle'
	},
	SEQUENCER_TYPE_:{
		ccValue: 29,
		label: 'Sequencer Type',
		type: 'groupable_button',
		className: 'alt-right-above-bypass',
		values: [
			{
				label: 'Pitch',
				value: 0
			},
			{
				label: 'Sample Rate',
				value: 63
			},
			{
				label: 'Filter',
				value: 127
			},
		]
	},
	BYPASS_: {
		ccValue: 14,
		label: 'Bypass',
		type: 'button',
		className: 'alt-right-bottom',
		toggleValues: [0, 127]
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
	TAP_: {
		ccValue: 28,
		label: 'Tap',
		type: 'button',
		value: 127,
		className: 'alt-left-bottom'
	},
	// STUTTER_HOLD:{
	// 	ccValue: 31,
	// 	label: 'Stutter Hold',
	// 	type: 'groupable_button',
	// 	values: [
	// 		{
	// 			label: 'On',
	// 			value: 0
	// 		},
	// 		{
	// 			label: 'Off',
	// 			value: 127
	// 		}
	// 	],
	// }
}