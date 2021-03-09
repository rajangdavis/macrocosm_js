import DropDown from '../components/dropdown' 

export default function MidiDevicePortSelector(portChange, label, ports){
  console.log(ports)
  return (
    <div>
      <select onChange={portChange}>
        <option value="">Pick an {label}</option>
        {ports.map(port => (
          <option key={port.name} value={port.name}>{port.name}</option>
        ))}
      </select>
    </div>
  )
}


