import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../pedal_functions/meris_hedra'

export default class MerisHedra extends MerisGenericLayout {
  constructor(props, context) {
    let pedalData = {
      name: 'Meris Hedra',
      className: 'meris-hedra',
      pedalFunctions: pedalFunctions
    }
    super(props, context, pedalData);
  }
}
