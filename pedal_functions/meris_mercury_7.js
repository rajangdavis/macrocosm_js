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
	SPACE_DECAY: {
		ccValue: 16,
		type: 'knob',
		label: 'Space Decay',
		className: 'left-top'
	},
	MODULATE: {
		ccValue: 17,
		type: 'knob',
		label: 'Modulate',
		className: 'center-top'
	},
	MIX: {
		ccValue: 18,
		type: 'knob',
		label: 'Mix',
		className: 'right-top'
	},
	LO_FREQ: {
		ccValue: 19,
		type: 'knob',
		label: 'Lo Frequency',
		className: 'left-middle'
	},
	PITCH_VECTOR: {
		ccValue: 20,
		type: 'knob',
		label: 'Pitch Vector',
		className: 'center-middle'
	},
	HI_FREQ: {
		ccValue: 21,
		type: 'knob',
		label: 'Hi Frequency',
		className: 'right-middle'
	},
	ALGORITHM_SELECT:{
		ccValue: 29,
		label: 'Algorithm Select',
		type: 'groupable_button',
		className: 'right-above-bypass',
		values: [
			{
				label: 'Ultraplate',
				value: 0
			},
			{
				label: 'Cathedra',
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
	PREDELAY: {
		ccValue: 22,
		type: 'knob',
		label: 'Predelay',
		className: 'alt-left-top'
	},
	MOD_SPEED: {
		ccValue: 23,
		type: 'knob',
		label: 'Mod Speed',
		className: 'alt-center-top'
	},
	PITCH_VECTOR_MIX: {
		ccValue: 24,
		type: 'knob',
		label: 'Pitch Vector Mix',
		className: 'alt-right-top'
	},
	DENSITY: {
		ccValue: 25,
		type: 'knob',
		label: 'Density',
		className: 'alt-left-middle'
	},
	ATTACK_TIME: {
		ccValue: 26,
		type: 'knob',
		label: 'Attack Time',
		className: 'alt-center-middle'
	},
	VIBRATO_DEPTH: {
		ccValue: 27,
		type: 'knob',
		label: 'Vibrato Depth',
		className: 'alt-right-middle'
	},
	ALGORITHM_SELECT_:{
		ccValue: 29,
		label: 'Algorithm Select',
		type: 'groupable_button',
		className: 'alt-right-above-bypass',
		values: [
			{
				label: 'Ultraplate',
				value: 0
			},
			{
				label: 'Cathedra',
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
	SWELL: {
		ccValue: 28,
		label: 'Swell',
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
	SWELL_: {
		ccValue: 28,
		label: 'Swell',
		type: 'button',
		value: 127,
		className: 'alt-left-bottom'
	},
}