import MerisEnzo from './meris_pedals/meris_enzo'
import MerisHedra from './meris_pedals/meris_hedra'
import MerisPolymoon from './meris_pedals/meris_polymoon'
import MerisMercury7 from './meris_pedals/meris_mercury_7'
import MerisOttobitJr from './meris_pedals/meris_ottobit_jr'
import MerisGenericLayout from './meris_pedals/meris_generic_layout'

module.exports = [
	{
		label: 'Meris Hedra',
		initialState: MerisHedra,
		component: MerisGenericLayout
	},
	{
		label: 'Meris Enzo',
		initialState: MerisEnzo,
		component: MerisGenericLayout
	},
	{
		label: 'Meris Polymoon',
		initialState: MerisPolymoon,
		component: MerisGenericLayout
	},
	{
		label: 'Meris Mercury7',
		initialState: MerisMercury7,
		component: MerisGenericLayout
	},
	{
		label: 'Meris Ottobit Jr',
		initialState: MerisOttobitJr,
		component: MerisGenericLayout
	},
]