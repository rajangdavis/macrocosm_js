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

  let devicePortChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.dispatch({
      type: 'update-midi-device',
      new_value: e.target.value,
      field: 'output_port',
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
    })
  }

  let programNumberChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.dispatch({
      type: 'update-midi-device',
      new_value: e.target.value,
      field: 'program_number',
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
    })
  }

  let sendProgramNumber = ()=>{
    let intMidiChannel = parseInt(md.midi_channel);
    let intProgramNumber = parseInt(md.program_number);
    deviceOutput().setProgram(intProgramNumber, {channels: intMidiChannel});
    console.log("Command sent", {intProgramNumber: intProgramNumber, channels: intMidiChannel})
  }

  let midiChannelChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.dispatch({
      type: 'update-midi-device',
      field: 'midi_channel',
      new_value: e.target.value,
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

  let devicePortNotSet = () => {
    return md.output_port == ""
  }

  let deviceOutput = () => {
    return props.midiObject.MIDI.outputs.filter((x) => x.name == md.output_port)[0];
  }

  return <div className="pedal-tamer">
    <div onClick={removeMidiDevice}>Delete</div>
    <a onClick={toggleMidiDeviceOptions}>Pedal Tamer</a>
    <div>
      <MidiDevicePortSelector onChange={devicePortChange} label='output' ports={props.midiObject.outputValues} value={md.output_port}/>
      <div>
        <MidiChannelSelect disabled={ devicePortNotSet() } midiChannelChange={midiChannelChange} midiChannel={md.midi_channel}/>
        <ProgramChangeInput disabled={ devicePortNotSet() } onChange={programNumberChange} deviceOutput={deviceOutput} label='Program Number' programNumber={md.program_number} midiChannel={md.midi_channel}/>
        <button disabled={ devicePortNotSet() } onClick={sendProgramNumber}>Send</button>
      </div>
    </div>
  </div>
}
