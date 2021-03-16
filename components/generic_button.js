export default function GenericButton(props){

  let state = {
    toggled: 0
  }

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
      var msgVal = state.toggled ==  0  ? 127 : 0
      state.toggled = msgVal;
    }else{
      var msgVal = props.mappedTo.value
    }
    props.deviceOutput.sendControlChange(props.mappedTo.ccValue, msgVal,{channels: intMidiChannel});
    console.log("Meris Hedra sent a change message", props.mappedTo.ccValue, msgVal, {channels: intMidiChannel})
  }
  
  return (<div className={props.className}> 
      <button onClick={sendChangeMessage}>{props.mappedTo.label}</button>
    </div>)
}
