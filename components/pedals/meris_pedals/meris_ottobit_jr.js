import MerisGenericLayout from './meris_generic_layout'
import * as pedalFunctions from '../../../pedal_functions/meris_ottobit_jr'

export default function MerisOttobitJr(props){
  let pedalData = {
    name: 'Meris Ottobit Jr',
    className: 'meris-ottobit-jr',
    pedalFunctions: pedalFunctions
  }
  return MerisGenericLayout(props, pedalData);
}
