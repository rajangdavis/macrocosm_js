module.exports = {
	// EXPRESSION: {
	// 	ccValue: 4,
	// 	type: 'knob',
	// 	label: 'Expression Pedal'
	// },
	ENVELOPE_TYPE: {
		ccValue: 9,
		label: 'Half Speed Enable',
		type: 'button',
		toggleValues: [63, 64]
	},
	BYPASS: {
		ccValue: 14,
		label: 'Bypass',
		type: 'button',
		classname: 'bottom-right',
		toggleValues: [0, 127]
	},
	// TEMPO: {
	// 	ccValue: 15,
	// 	type: 'knob',
	// 	label: 'Tempo (to millisec intervals)'
	// },
	PITCH: {
		ccValue: 16,
		type: 'knob',
		label: 'Pitch',
		className: 'top-left'
	},
	FILTER: {
		ccValue: 17,
		type: 'knob',
		label: 'Filter',
		className: 'top-center'
	},
	MIX: {
		ccValue: 18,
		type: 'knob',
		label: 'Mix',
		className: 'top-right'
	},
	// SUSTAIN: {
	// 	ccValue: 19,
	// 	type: 'knob',
	// 	label: 'Sustain'
	// },
	// FILTER_ENVELOPE: {
	// 	ccValue: 20,
	// 	type: 'knob',
	// 	label: 'Filter Envelope'
	// },
	// MODULATION: {
	// 	ccValue: 21,
	// 	type: 'knob',
	// 	label: 'Modulation'
	// },
	// PORTAMENTO: {
	// 	ccValue: 22,
	// 	type: 'knob',
	// 	label: 'Portamento'
	// },
	// FILTER_TYPE: {
	// 	ccValue: 23,
	// 	type: 'knob',
	// 	label: 'Filter Type'
	// },
	// DELAY_LEVEL: {
	// 	ccValue: 24,
	// 	type: 'knob',
	// 	label: 'Delay Level'
	// },
	// RING_MODULATION: {
	// 	ccValue: 25,
	// 	type: 'knob',
	// 	label: 'Ring Modulation'
	// },
	// FILTER_BANDWIDTH: {
	// 	ccValue: 26,
	// 	type: 'knob',
	// 	label: 'Filter Bandwidth'
	// },
	// DELAY_FEEDBACK: {
	// 	ccValue: 27,
	// 	type: 'knob',
	// 	label: 'Delay Feedback'
	// },
	// TAP: {
	// 	ccValue: 28,
	// 	label: 'Tap',
	// 	type: 'button',
	// 	value: 127
	// },
	// SYNTH_MODE:{
	// 	ccValue: 29,
	// 	label: 'Synth Mode',
	// 	type: 'groupable_button',
	// 	values: [
	// 		{
	// 			label: 'Dry',
	// 			value: 0
	// 		},
	// 		{
	// 			label: 'Mono',
	// 			value: 63
	// 		},
	// 		{
	// 			label: 'Arp',
	// 			value: 95
	// 		},
	// 		{
	// 			label: 'Poly',
	// 			value: 127
	// 		},
	// 	]
	// },
	// SYNTH_WAVESHAPE: {
	// 	ccValue: 30,
	// 	label: 'Synth Waveshape',
	// 	type: 'groupable_button',
	// 	values: [
	// 		{
	// 			label: 'Sawtooth',
	// 			value: 0
	// 		},
	// 		{
	// 			label: 'Square',
	// 			value: 127
	// 		}
	// 	]
	// }
}