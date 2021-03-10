import MerisMidiIo from './meris_midi_io_hooks' 
import PedalBoardTamerDropDown from './pedal_board_tamer_dropdown_hooks'

module.exports = {
	midiDevices: [
		{
			component: MerisMidiIo,
			label: 'Meris MIDI IO'
		},
		{
			component: PedalBoardTamerDropDown,
			label: 'Cusack Pedals MIDI to PBT'
		},
	]
}