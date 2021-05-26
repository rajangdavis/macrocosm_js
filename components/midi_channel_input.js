export default function MidiChannelInput(props){
  return (<div className="midi-channel-input">
            <label>MIDI CHANNEL</label>
            <input type="number" min="1" max="16"/>
          </div>)
}
