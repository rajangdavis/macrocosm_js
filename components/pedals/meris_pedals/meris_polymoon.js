import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../../pedal_functions/meris_polymoon'

export default function MerisPolymoon(props){
  let pedalData = {
    name: 'Meris Polymoon',
    className: 'meris-polymoon',
    pedalFunctions: pedalFunctions
  }
  return MerisGenericLayout(props, pedalData);
}
