import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../pedal_functions/meris_ottobit_jr'

export default class MerisOttobitJr extends MerisGenericLayout {
  constructor(props, context) {
    let pedalData = {
      name: 'Meris Ottobit Jr',
      className: 'meris-ottobit-jr',
      pedalFunctions: pedalFunctions
    }
    super(props, context, pedalData);
  }
}