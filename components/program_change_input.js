export default function ProgramChangeInput(props){

  let programNumberChange = (e)=>{
    props.onChange(e);
    let intMidiChannel = parseInt(props.midiChannel);
    let intProgramNumber = parseInt(e.target.value);
    props.deviceOutput().setProgram(intProgramNumber, {channels: intMidiChannel});
    console.log("Command sent", {intProgramNumber: intProgramNumber, channels: intMidiChannel})
  }
  
  return (<div className={props.className}> 
        <label>{props.label}</label>
        <input disabled={props.disabled} type="number" value={props.programNumber} min="0" max="127" onChange={programNumberChange}/>
      </div>)
}
