import MerisGenericLayout from './meris_generic_layout_hooks'
import * as pedalFunctions from '../../pedal_functions/meris_enzo'

export default class MerisEnzo extends MerisGenericLayout {
  constructor(props, context) {
    let pedalData = {
      name: 'Meris Enzo',
      className: 'meris-enzo',
      pedalFunctions: pedalFunctions
    }
    super(props, context, pedalData);
  }
}
