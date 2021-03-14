import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../../pedal_functions/meris_hedra'

export default function MerisEnzo(props){
  let pedalData = {
    name: 'Meris Hedra',
    className: 'meris-hedra',
    pedalFunctions: pedalFunctions
  }
  return MerisGenericLayout(props, pedalData);
}
