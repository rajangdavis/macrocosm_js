import React from 'react'
export default class MerisPresets extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    	active: false
    }
    this.programNumberChange = this.programNumberChange.bind(this);
    this.isActive = this.isActive.bind(this);
    this.showOrHide = this.showOrHide.bind(this);
    this.showOrHideLabel = this.showOrHideLabel.bind(this);
  }

  isActive(){
    return this.state.active ? "" : "hidden"
  }

  showOrHide(){
  	this.setState({active: !this.state.active})
  }

  showOrHideLabel(){
  	return this.state.active ?  "Presets[-]": "Presets[+]"
  }

  programNumberChange(value){
    let intMidiChannel = parseInt(this.props.midiChannel);
    let intProgramNumber = parseInt(value);
    this.props.deviceOutput().setProgram(intProgramNumber, {channels: intMidiChannel});
    console.log("Command sent", {intProgramNumber: intProgramNumber, channels: intMidiChannel})
    this.state.programNumber = value
  }

  render(){
		let presetVals = Array(17).fill().map((_, i) => i + 1)
		let groupedPresets = []
		var tempArr = []
		
		presetVals.map(x =>{
			if(((x-4)%4 == 1) || (x == Math.max(...presetVals))){
				groupedPresets.push(tempArr);
				tempArr = []
			}
			tempArr.push(x)
		})

		return <div className="preset-groups-container">
			<div className={`preset-groups ${this.isActive()}`}>
			  {groupedPresets.map((group) =>{
			  	return <div>{group.map((button => {
			    	return <button key={button} onClick={()=> this.programNumberChange(button)} >{button}</button>
			  	}))}</div>
			  })}
			</div>
			<span onClick={this.showOrHide}>{this.showOrHideLabel()}</span>
		</div>

  }
}

