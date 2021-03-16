import MerisEnzo from './meris_pedals/meris_enzo'
import * as EnzoPedalFunctions from '../../pedal_functions/meris_enzo'
import MerisHedra from './meris_pedals/meris_hedra'
import * as HedraPedalFunctions from '../../pedal_functions/meris_hedra'
import MerisPolymoon from './meris_pedals/meris_polymoon'
import * as PolymoonPedalFunctions from '../../pedal_functions/meris_polymoon'
import MerisMercury7 from './meris_pedals/meris_mercury_7'
import * as Mercury7PedalFunctions from '../../pedal_functions/meris_mercury_7'
import MerisOttobitJr from './meris_pedals/meris_ottobit_jr'
import * as OttobitJrPedalFunctions from '../../pedal_functions/meris_ottobit_jr'
import MerisComputedFunctions from './meris_pedals/meris_computed_functions'

module.exports = [
	{
		component: MerisEnzo,
		pedalData:{
			pedalFunctions: EnzoPedalFunctions,
			className: 'meris-enzo',
			label: 'Meris Enzo',
		},
		computedFunctions: MerisComputedFunctions
	},
	{
		component: MerisHedra,
		pedalData:{
			pedalFunctions: HedraPedalFunctions,
			className: 'meris-hedra',
			label: 'Meris Hedra',
		},
		computedFunctions: MerisComputedFunctions
	},
	{
		component: MerisPolymoon,
		pedalData:{
			pedalFunctions: PolymoonPedalFunctions,
			className: 'meris-polymoon',
			label: 'Meris Polymoon',
		},
		computedFunctions: MerisComputedFunctions
	},
	{
		component: MerisMercury7,
		pedalData:{
			pedalFunctions: Mercury7PedalFunctions,
			className: 'meris-mercury7',
			label: 'Meris Mercury7',
		},
		computedFunctions: MerisComputedFunctions
	},
	{
		component: MerisOttobitJr,
		pedalData:{
			pedalFunctions: OttobitJrPedalFunctions,
			className: 'meris-ottobit-jr',
			label: 'Meris Ottobit Jr',
		},
		computedFunctions: MerisComputedFunctions
	},
]