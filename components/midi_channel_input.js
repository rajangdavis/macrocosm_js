export default function MidiChannelInput(props){
  return (<div className="midi-channel-input">
            <label>MIDI CHANNEL</label>
            <input type="number" value={props.value} onChange={props.onChange} min="1" max="16"/>
          </div>)
}
