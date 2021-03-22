import DropDown from '../components/dropdown' 

export default function MidiDevicePortSelector(props){

  return (
    <div>
      <select onChange={props.onChange} value={props.value}>
        <option value="">Pick an {props.label}</option>
        {props.ports.map(port => (
          <option key={port.name} value={port.name}>{port.name}</option>
        ))}
      </select>
    </div>
  )
}


