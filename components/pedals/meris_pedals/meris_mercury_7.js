import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../../pedal_functions/meris_mercury_7'

export default function MerisMercury7(props){
  let pedalData = {
    name: 'Meris Mercury7',
    className: 'meris-mercury7',
    pedalFunctions: pedalFunctions
  }
  return MerisGenericLayout(props, pedalData);
}
