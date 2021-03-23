import midiDevices from '../components/midi_devices/map'

export default function MacroButton(props){
  let bd = props.buttonData;
  let removeMacro = () => {
    props.dispatch({
      type: 'remove-macro',
      macro_id: bd.macro_id
    })
  }
  let toggleMidiDeviceOptions = () => {
    props.dispatch({
      type: 'update-macro',
      macro_id: bd.macro_id,
      field: 'show_midi_devices',
      new_value: !bd.show_midi_devices
    })
  }
  let addMidiDevice = (x) => {
    props.dispatch({
      type: 'create-midi-device',
      macro_id: bd.macro_id,
      component_label: x.label
    });
    toggleMidiDeviceOptions()
  }
  let cloneMacro = () => {
    props.dispatch({
      type: 'clone-macro',
      macro_id: bd.macro_id
    })
  }

  let findComponent = (device) =>{
    return midiDevices.filter(x => x.label == device.component_label)[0].component;
  }

  return (
    <div className="macro">
      <div onClick={removeMacro}>Delete</div>
      <div className="midi-devices">
        <div onClick={toggleMidiDeviceOptions}>Add MIDI Device</div>
      </div>
      <div className={bd.show_midi_devices ? '' : 'hidden'}>
        {midiDevices.map((x,i)=> {
          return <p key={i} onClick={()=> addMidiDevice(x)}>{x.label}</p>
        })}
      </div>
      <div onClick={cloneMacro}>Clone</div>
      <div>
        {bd.midi_devices.map((midi_device, i) => {
          props.midi_device_id = midi_device.midi_device_id
          props.macro_id = midi_device.macro_id
          props.midiDevice = midi_device
          let deviceToRender = findComponent(midi_device)
          return <div key={i}>{deviceToRender(props)}</div>
        } )}
      </div>
    </div>
  )

}
