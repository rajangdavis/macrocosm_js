export default function MidiChannelSelect(props){
  return (<div className={props.className}>
            <label>Midi Channel</label>
            <input disabled={props.disabled} type="number" value={props.midiChannel} min="1" max="16" onChange={props.midiChannelChange}/>
          </div>)
}
