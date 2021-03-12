import MerisHedra from '../meris_pedals/meris_hedra'
import MerisEnzo from '../meris_pedals/meris_enzo'
import MerisMercury7 from '../meris_pedals/meris_mercury_7'
import MerisPolymoon from '../meris_pedals/meris_polymoon'
import MerisOttobitJr from '../meris_pedals/meris_ottobit_jr'
import MidiDevicePortSelector from '../midi_device_port_selector'

export default function MerisMidiIo(props){
  let removeMidiDevice = () => props.dispatch({ type: 'remove-midi-device', macro_id: props.midi_device_id  })
  let toggleMidiDeviceOptions = () => props.dispatch({ type: 'toggle-midi-device', midi_device_id: props.midi_device_id })
  let addPedal = (component) => props.dispatch({ type: 'add-pedal-to-midi-device', midi_device_id: props.midi_device_id, component: component })

  return (<div className="meris-midi-io">
        <a onClick={toggleMidiDeviceOptions}>Meris MIDI IO</a>
        <p>Add Pedals</p>
        <div className={'sup'} >

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

  // {MidiDevicePortSelector(this.outputPortChange,"input", this.props.outputValues)}
  // {MidiDevicePortSelector(this.outputPortChange,"output", this.props.outputValues)}
  // <MerisHedra midiObject={midiObject} inputPort={1} outputPort={1} />
  // <MerisEnzo midiObject={midiObject} inputPort={1} outputPort={1} />
  // <MerisPolymoon midiObject={midiObject} inputPort={1} outputPort={1} />
  // <MerisMercury7 midiObject={midiObject} inputPort={1} outputPort={1} />
  // <MerisOttobitJr midiObject={midiObject} inputPort={1} outputPort={1} />
