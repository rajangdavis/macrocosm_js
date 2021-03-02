import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../pedal_functions/meris_polymoon'

export default class MerisPolymoon extends MerisGenericLayout {
  constructor(props, context) {
    let pedalData = {
      name: 'Meris Polymoon',
      className: 'meris-polymoon',
      pedalFunctions: pedalFunctions
    }
    super(props, context, pedalData);
  }
}