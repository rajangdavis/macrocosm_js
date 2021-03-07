import { useState} from 'react'
import MidiChannelSelect from '../midi_channel_select'
import MerisHedra from '../meris_pedals/meris_hedra'
import MerisEnzo from '../meris_pedals/meris_enzo'
import MerisMercury7 from '../meris_pedals/meris_mercury_7'
import MerisPolymoon from '../meris_pedals/meris_polymoon'
import MerisOttobitJr from '../meris_pedals/meris_ottobit_jr'
import ProgramChangeInput from '../program_change_input'
import MidiDevicePortSelector from '../midi_device_port_selector'

export default function MerisMidiIo(midiObject){
  const [merisMidiIoActive, setMerisMidiIoActive] = useState(false);
  const [programNumber, setProgramNumber] = useState("1");
  const [inputPort, setInputPort] = useState("1");
  const [outputPort, setOutputPort] = useState("1");

  const inputPortChange = (e) => {
    // setInputPort(event.target.value)
  }

  const outputPortChange = (e) => {
    // setInputPort(event.target.value)
  }

  const showControls = () => {
    // setInputPort(event.target.value)
  }

  const isActive = () => {
    return active ? "" : "hidden"
  }
  
  const inputPortNotSet = () => {
    return inputPort == ""
  }

  const outputPortNotSet = () => {
    return outputPort == ""
  }

  // {MidiDevicePortSelector(this.outputPortChange,"input", this.props.outputValues)}
  // {MidiDevicePortSelector(this.outputPortChange,"output", this.props.outputValues)}
  // <MerisHedra midiObject={this.props.midiObject} inputPort={this.state.inputPort} outputPort={this.state.outputPort} />
  // <MerisEnzo midiObject={this.props.midiObject} inputPort={this.state.inputPort} outputPort={this.state.outputPort} />
  // <MerisPolymoon midiObject={this.props.midiObject} inputPort={this.state.inputPort} outputPort={this.state.outputPort} />
  // <MerisMercury7 midiObject={this.props.midiObject} inputPort={this.state.inputPort} outputPort={this.state.outputPort} />
  // <MerisOttobitJr midiObject={this.props.midiObject} inputPort={this.state.inputPort} outputPort={this.state.outputPort} />
  
    return <div className="meris-midi-io">
      <a onClick={this.showControls}>Meris MIDI IO</a>
      <div className={isActive()} >
        
      </div>
    </div>
}
