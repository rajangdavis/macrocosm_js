import MidiChannelSelect from '../midi_channel_select'
import ProgramChangeInput from '../program_change_input'
import MidiDevicePortSelector from '../midi_device_port_selector'
import { useState} from 'react'

export default function PedalBoardTamerDropDown(props){
  let removeMidiDevice = () => props.dispatch({ type: 'remove-midi-device', macro_id: props.midi_device_id  })
  let toggleMidiDeviceOptions = () => props.dispatch({ type: 'toggle-midi-device', midi_device_id: props.midi_device_id })
  // const [active, setActive] = useState(true);
  // const [midiChannel, setMidiChannel] = useState("1");
  // const [programNumber, setProgramNumber] = useState("1");
  // const [devicePort, setDevicePort] = useState("");

  // const midiChannelChange = () => {
  //   setMidiChannel(event.target.value)
  // }

  // const devicePortChange = () => {
  //   setProgramNumber(event.target.value)
  // }

  // const showControls = () => {
  //   setActive(!active)
  // }

  const isActive = () => {
    'test'
  }

  // const devicePortNotSet = () => {
  //   return devicePort == ""
  // }

  // const deviceOutput = () => {
  //   console.log(midiObject)
  //   return midiObject.MIDI.outputs.filter((x) => x.name == devicePort)[0];
  // }
  // {MidiDevicePortSelector(devicePortChange,'output', midiObject.outputValues) }
  //     <div>
  //       <MidiChannelSelect disabled={ devicePortNotSet() } midiChannelChange={midiChannelChange} midiChannel={midiChannel}/>
  //       <ProgramChangeInput disabled={ devicePortNotSet() } deviceOutput={deviceOutput} programNumber={programNumber} />
  //     </div>

  return <div className="pedal-tamer">
    <a onClick={toggleMidiDeviceOptions}>Pedal Tamer</a>
    <div>

    </div>
  </div>
}
