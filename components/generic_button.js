export default function GenericButton(props){
  let sendChangeMessage = function(){
    if (props.buttonType == "alt"){
      props.changeAltState()
    }else{
      midiControlChange()
    }
  }

  let midiControlChange = function(){
    let intMidiChannel = parseInt(props.midiChannel);
    let toggleValues = props.mappedTo.toggleValues;
    if(toggleValues != undefined){
      var msgVal = props.mappedTo.value ==  toggleValues[0]  ? toggleValues[1] : toggleValues[0]
    }else{
      var msgVal = props.mappedTo.value
    }
    props.deviceOutput.sendControlChange(props.mappedTo.ccValue, msgVal, {channels: intMidiChannel});
    console.log(`${props.pedalName} sent a change message`, props.mappedTo.ccValue, msgVal, {channels: intMidiChannel})
    props.controlChange(props.pedalFunction, msgVal);
  }
  
  return (<div className={props.className}> 
      <button onClick={sendChangeMessage}>{props.mappedTo.label}</button>
    </div>)
}
