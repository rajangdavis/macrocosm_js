import ManageMidiDevices from '../../hooks/manage_midi_devices'
import MidiDevicePortSelector from '../midi_device_port_selector'
import pedals from '../pedals/map'

export default function MerisMidiIo(props){
  const [midiDeviceState, midiDispatch] = ManageMidiDevices();
  let outputPortChange = () => props.dispatch({ type: 'update-midi-device', macro_id: props.midi_device_id  })
  let inputPortChange = () => props.dispatch({ type: 'remove-midi-device', macro_id: props.midi_device_id  })
  let removeMidiDevice = () => props.dispatch({ type: 'remove-midi-device', macro_id: props.midi_device_id  })
  let toggleMidiDeviceOptions = () => props.dispatch({ type: 'toggle-midi-device', midi_device_id: props.midi_device_id })
  let addPedal = (x) => midiDispatch({ type: 'add-pedal-to-midi-device', midi_device_id: midiDeviceState.midi_device_id, component: x.label, props: props })

  // {MidiDevicePortSelector(outputPortChange,"input", this.props.outputValues)}
  // {MidiDevicePortSelector(outputPortChange,"output", this.props.outputValues)}

  return (<div className="meris-midi-io">
        <a onClick={toggleMidiDeviceOptions}>Meris MIDI IO</a>
        <p>Add Pedals</p>
        <div>
          {pedals.map((x,i)=> {
            return <p key={i} onClick={()=> addPedal(x)}>{x.label}</p>
          })}
        </div>
        <div className='midi-ports-select' >
          {midiDeviceState.pedals.map(device => device)}
        </div>
      </div>)
}

  // const [active, setActive] = useState(false);
  // const [programNumber, setProgramNumber] = useState("1");
  // const [inputPort, setInputPort] = useState("1");
  // const [outputPort, setOutputPort] = useState("1");

  // const inputPortChange = (e) => {
  //   // setInputPort(event.target.value)
  // }

  // const outputPortChange = (e) => {
  //   // setInputPort(event.target.value)
  // }
  
  // const inputPortNotSet = () => {
  //   return inputPort == ""
  // }

  // const outputPortNotSet = () => {
  //   return outputPort == ""
  // }  