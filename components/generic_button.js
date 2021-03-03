import React from 'react'

export default class GenericButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggled: 0
    }
    if (props.changeAltState)
      this.changeAltState = props.changeAltState.bind(this)
    this.midiControlChange = this.midiControlChange.bind(this);
    this.sendChangeMessage = this.sendChangeMessage.bind(this);
  }

  sendChangeMessage(){
    if (this.props.buttonType == "alt"){
      this.changeAltState()
    }else{
      this.midiControlChange()
    }
  }

  midiControlChange(){
    let intMidiChannel = parseInt(this.props.midiChannel);
    let toggleValues = this.props.mappedTo.toggleValues;
    if(toggleValues != undefined){
      var msgVal = this.state.toggled ==  0  ? 127 : 0
      this.state.toggled = msgVal;
    }else{
      var msgVal = this.props.mappedTo.value
    }
    this.props.deviceOutput().sendControlChange(this.props.mappedTo.ccValue, msgVal,{channels: intMidiChannel});
    console.log("Meris Hedra sent a change message", this.props.mappedTo.ccValue, msgVal, {channels: intMidiChannel})
  }
  
  render(){
    return <div className={this.props.className}> 
      <button onClick={this.sendChangeMessage}>{this.props.mappedTo.label}</button>
    </div>
  }
}
