import MidiDevicePortSelector from '../midi_device_port_selector'
import MerisComputedFunctions from '../pedals/meris_pedals/meris_computed_functions'
import pedals_ from '../pedals/map'

export default function MerisMidiIo(props){
  let md = props.midiDevice;

  let outputPortChange = (e) => {
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
  let inputPortChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.dispatch({
      type: 'update-midi-device',
      new_value: e.target.value,
      field: 'input_port',
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
     })
  }
  let toggleMidiDeviceOptions = () => {
    props.dispatch({
      type: 'update-midi-device',
      field: 'show_pedals',
      new_value: !md.show_pedals,
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
    })
  }
  let removeMidiDevice = () => {
    props.dispatch({
      type: 'remove-midi-device',
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
    })
  }
  let addPedal = (component) => {
    props.dispatch({
      type: 'create-pedal',
      component: component,
      midi_device_id: props.midi_device_id,
      macro_id: props.macro_id
    })
  }

  let canShowPedals = ()=>{
    return md.show_pedals == true ? 'midi-ports-select' : 'hidden';
  }

  return (<div className="meris-midi-io">
            <div onClick={removeMidiDevice}>Delete</div>
            <a>Meris MIDI IO</a>
            {MidiDevicePortSelector(inputPortChange,"input", props.midiObject.inputValues)}
            {MidiDevicePortSelector(outputPortChange,"output", props.midiObject.outputValues)}
            <p onClick={toggleMidiDeviceOptions}>Add Pedals</p>
            <div className={canShowPedals()}>
              {pedals_.map((x,i)=> {
                return <p key={i} onClick={()=> addPedal(x)}>{x.pedalData.label}</p>
              })}
            </div>
          </div>)
}
            // <div>
            //   {md.pedals.map((pedal, y)=>{
            //     return <div key={y}>{pedal(md)}</div>
            //   })}
            // </div>