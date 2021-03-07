import MerisMidiIo from '../components/midi_devices/meris_midi_io' 
import PedalBoardTamerDropDown from '../components/midi_devices/pedal_board_tamer_dropdown' 

// Figure out why this is broken...
// {PedalBoardTamerDropDown(midiObject, inputValues, outputValues )}

export default function MacroButton(midiObject, inputValues, outputValues){
  return (
    <div className="container macro">
      {MerisMidiIo(midiObject)}
    </div>
  )

}


