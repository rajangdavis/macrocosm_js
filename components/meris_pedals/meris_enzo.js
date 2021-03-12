import MerisGenericLayout from './meris_generic_layout_hooks'
import * as pedalFunctions from '../../pedal_functions/meris_enzo'

export default function MerisEnzo(props){
  let pedalData = {
    name: 'Meris Enzo',
    className: 'meris-enzo',
    pedalFunctions: pedalFunctions
  }
  return MerisGenericLayout(props, pedalData);
}
