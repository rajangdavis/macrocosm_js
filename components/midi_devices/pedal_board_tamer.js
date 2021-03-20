import MidiChannelSelect from '../midi_channel_select'
import ProgramChangeInput from '../program_change_input'
import MidiDevicePortSelector from '../midi_device_port_selector'

export default function PedalBoardTamer(props){
  let md = props.midiDevice;
  let removeMidiDevice = () => {
    props.dispatch({
      type: 'remove-midi-device',
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
    })
  }
  let toggleMidiDeviceOptions = () => {
    props.dispatch({
      type: 'update-midi-device',
      field: 'open',
      new_value: !md.open,
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
    })
  }

  // let midiChannelChange = () => {
  //   setMidiChannel(event.target.value)
  // }

  // let devicePortChange = () => {
  //   setProgramNumber(event.target.value)
  // }

  // let showControls = () => {
  //   setActive(!active)
  // }

  let isActive = () => {
    'test'
  }

  // let devicePortNotSet = () => {
  //   return devicePort == ""
  // }

  // let deviceOutput = () => {
  //   console.log(midiObject)
  //   return props.midiObject.MIDI.outputs.filter((x) => x.name == devicePort)[0];
  // }
  // {MidiDevicePortSelector(devicePortChange,'output', midiObject.outputValues) }
  //     <div>
  //       <MidiChannelSelect disabled={ devicePortNotSet() } midiChannelChange={midiChannelChange} midiChannel={midiChannel}/>
  //       <ProgramChangeInput disabled={ devicePortNotSet() } deviceOutput={deviceOutput} programNumber={programNumber} />
  //     </div>

  return <div className="pedal-tamer">
    <div onClick={removeMidiDevice}>Delete</div>
    <a onClick={toggleMidiDeviceOptions}>Pedal Tamer</a>
    <div>

    </div>
  </div>
}
