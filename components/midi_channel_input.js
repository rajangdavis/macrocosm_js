export default function MidiChannelInput(props){
  const {
    label,
    midiConfig,
    value,
    updateConfig
  } = props;
  const updateChannel = (e)=>{
    let val = e.target.value;
    if(val >=0 && val < 17){
      updateConfig(value, parseInt(val))
    }
  }
  return (<div className="midi-channel-input">
            <label>{label}</label>
            <input type="number" value={midiConfig[value]} onChange={updateChannel} min="0" max="16"/>
          </div>)
}
