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
	PITCH: {
		ccValue: 16,
		type: 'knob',
		label: 'Pitch',
		className: 'left-top'
	},
	FILTER: {
		ccValue: 17,
		type: 'knob',
		label: 'Filter',
		className: 'center-top'
	},
	MIX: {
		ccValue: 18,
		type: 'knob',
		label: 'Mix',
		className: 'right-top'
	},
	SUSTAIN: {
		ccValue: 19,
		type: 'knob',
		label: 'Sustain',
		className: 'left-middle'
	},
	FILTER_ENVELOPE: {
		ccValue: 20,
		type: 'knob',
		label: 'Filter Envelope',
		className: 'center-middle'
	},
	MODULATION: {
		ccValue: 21,
		type: 'knob',
		label: 'Modulation',
		className: 'right-middle'
	},
	SYNTH_MODE:{
		ccValue: 29,
		label: 'Synth Mode',
		type: 'groupable_button',
		className: 'right-above-bypass',
		values: [
			{
				label: 'Dry',
				value: 0
			},
			{
				label: 'Mono',
				value: 63
			},
			{
				label: 'Arp',
				value: 95
			},
			{
				label: 'Poly',
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
	PORTAMENTO: {
		ccValue: 22,
		type: 'knob',
		label: 'Portamento',
		className: 'alt-left-top'
	},
	FILTER_TYPE: {
		ccValue: 23,
		type: 'knob',
		label: 'Filter Type',
		className: 'alt-center-top'
	},
	DELAY_LEVEL: {
		ccValue: 24,
		type: 'knob',
		label: 'Delay Level',
		className: 'alt-right-top'
	},
	RING_MODULATION: {
		ccValue: 25,
		type: 'knob',
		label: 'Ring Modulation',
		className: 'alt-left-middle'
	},
	FILTER_BANDWIDTH: {
		ccValue: 26,
		type: 'knob',
		label: 'Filter Bandwidth',
		className: 'alt-center-middle'
	},
	DELAY_FEEDBACK: {
		ccValue: 27,
		type: 'knob',
		label: 'Delay Feedback',
		className: 'alt-right-middle'
	},
	SYNTH_MODE_:{
		ccValue: 29,
		label: 'Synth Mode',
		type: 'groupable_button',
		className: 'alt-right-above-bypass',
		values: [
			{
				label: 'Dry',
				value: 0
			},
			{
				label: 'Mono',
				value: 63
			},
			{
				label: 'Arp',
				value: 95
			},
			{
				label: 'Poly',
				value: 127
			},
		]
	},
	SYNTH_WAVESHAPE: {
		ccValue: 30,
		label: 'Synth Waveshape',
		type: 'groupable_button',
		values: [
			{
				label: 'Sawtooth',
				value: 0
			},
			{
				label: 'Square',
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