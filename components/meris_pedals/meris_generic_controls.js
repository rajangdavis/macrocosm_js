import React from 'react'
import GenericKnob from '../generic_knob'
import GenericButton from '../generic_button'
import GroupableButtons from '../groupable_buttons'

export default class MerisGenericControls extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			pedalFunctions: props.pedalData.pedalFunctions,
      midiChannel: props.midiChannel,
		};

    this.changeAltState = props.changeAltState;
		this.deviceOutput = props.deviceOutput;
    this.fetchComponentByType = this.fetchComponentByType.bind(this);
    this.componentsByLocation = this.componentsByLocation.bind(this);
	}

	componentsByLocation(location){
    return Object.keys(this.state.pedalFunctions).filter((control, i) =>{
      let localControl = this.state.pedalFunctions[control];
      if(localControl.className && localControl.className.indexOf(location) == 0){
        return localControl;
      }
    });
  }

  fetchComponentByType(localControl, i){
    if(localControl.type == 'knob'){
      return <GenericKnob className={localControl.className} key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel}/>
    }else if(localControl.type == 'groupable_button'){
      return <GroupableButtons className={localControl.className} key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel} />
    }else if(localControl.type == 'button'){
      let buttonType = localControl.alt == true ? 'alt' : '';
      return <GenericButton className={localControl.className} key={i} mappedTo={localControl} deviceOutput={this.deviceOutput} midiChannel={this.state.midiChannel}  buttonType={buttonType} changeAltState={this.changeAltState}/>
    }
  }


	render(){
		let direction = this.props.direction
		return <div className={`${direction}-controls`}>
          {
            this.componentsByLocation(direction).map((key,i) =>{
            	let localControl = this.state.pedalFunctions[key];
              return this.fetchComponentByType(localControl, i)
          })}
          </div>
	}
}