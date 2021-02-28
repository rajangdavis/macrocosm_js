import React from 'react'

export default class GroupableButtons extends React.Component {
	constructor(props, context) {
    super(props, context);
    this.sendChangeMessage = this.sendChangeMessage.bind(this);
  }

  sendChangeMessage(value){
  	let intMidiChannel = parseInt(this.props.midiChannel)
  	let intValue = parseInt(value)
  	this.props.deviceOutput().sendControlChange(this.props.mappedTo.ccValue, intValue, {channels: intMidiChannel});
    console.log("Meris Hedra sent a change message", this.props.mappedTo.ccValue, intValue, {channels: intMidiChannel})
  }
  
  render(){
    return <div className={this.props.className}> 
      <div>
        <label>{this.props.mappedTo.label}</label>
        <div>
        	{this.props.mappedTo.values.map((x,i) => {
        		return <button key={i} onClick={()=> this.sendChangeMessage(x.value) }>{x.label}</button>
        	})}
        </div>
      </div>
      <style jsx>{`
        .hidden{
          display: none !important;
        }
        label{
          margin: 10px auto 5px;
          display: block;
          font-weight: bold;
        }
      `}</style>
    </div>
  }
}
