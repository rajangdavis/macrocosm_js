import MerisEnzo from './meris_pedals/meris_enzo'
import MerisHedra from './meris_pedals/meris_hedra'
import MerisPolymoon from './meris_pedals/meris_polymoon'
import MerisMercury7 from './meris_pedals/meris_mercury_7'
import MerisOttobitJr from './meris_pedals/meris_ottobit_jr'

module.exports = [
	{
		label: 'Meris Enzo',
		initialState: MerisEnzo,
	},
	{
		label: 'Meris Hedra',
		initialState: MerisHedra,
	},
	{
		label: 'Meris Polymoon',
		initialState: MerisPolymoon,
	},
	{
		label: 'Meris Meris Mercury7',
		initialState: MerisMercury7,
	},

	{
		label: 'Meris Ottobit Jr',
		initialState: MerisOttobitJr,
	},
]