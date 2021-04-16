import MidiDevicePortSelector from '../midi_device_port_selector'
import TapTempo from '../tap_tempo'
import ExpressionPedalListener from '../expression_pedal_listener'
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
      midi_device_id: md.midi_device_id,
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
      midi_device_id: md.midi_device_id,
      macro_id: props.macro_id
     })
  }
  let toggleMidiDeviceOptions = () => {
    props.dispatch({
      type: 'update-midi-device',
      field: 'show_pedals',
      new_value: !md.show_pedals,
      midi_device_id: md.midi_device_id,
      macro_id: props.macro_id
    })
  }
  let removeMidiDevice = () => {
    props.dispatch({
      type: 'remove-midi-device',
      midi_device_id: md.midi_device_id,
      macro_id: props.macro_id
    })
  }
  let addPedal = (pedal) => {
    props.dispatch({
      type: 'create-pedal',
      pedal: pedal.initialState(props),
      midi_device_id: md.midi_device_id,
      macro_id: props.macro_id
    })
    toggleMidiDeviceOptions()
  }

  let findComponent = (device) =>{
    return pedals_.filter(x => x.label == device.label)[0].component;
  }

  let canShowPedals = ()=>{
    return md.show_pedals == true ? 'midi-ports-select' : 'hidden';
  }

  return (<div className="meris-midi-io">
            <div onClick={removeMidiDevice}>Delete</div>
            <a>Meris MIDI IO</a>
            {ExpressionPedalListener({...props, md: md, inputPortChange: inputPortChange})}
            {TapTempo({...props, md: md, inputPortChange: inputPortChange})}
            <MidiDevicePortSelector onChange={outputPortChange} label="output" ports={props.midiObject.outputValues} value={md.output_port}/>
            <p onClick={toggleMidiDeviceOptions}>Add Pedals</p>
            <div className={canShowPedals()}>
              {pedals_.map((pedal,i)=> {
                return <p key={i} onClick={()=> addPedal(pedal)}>{pedal.label}</p>
              })}
            </div>
            <div>
              {md.pedals.map((pedal, y)=>{
                props.pedalData = pedal
                props.inputPort = md.input_port
                props.outputPort = md.output_port
                let pedaltoRender = findComponent(pedal)
                return <div className="pedal-container" key={y}>{pedaltoRender(props)}</div>
              })}
            </div>
          </div>)
}
