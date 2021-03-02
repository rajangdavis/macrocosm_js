import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../pedal_functions/meris_mercury_7'

export default class MerisMercury7 extends MerisGenericLayout {
  constructor(props, context) {
    let pedalData = {
      name: 'Meris Mercury7',
      className: 'meris-mercury7',
      pedalFunctions: pedalFunctions
    }
    super(props, context, pedalData);
  }
}