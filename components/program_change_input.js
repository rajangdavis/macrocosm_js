import React from 'react'

export default class ProgramChangeInput extends React.Component {
	constructor(props, context) {
    super(props, context);
  }
  
  render(){
    return <div className={this.props.className}> 
      <div>
        <label>Program Number</label>
        <input disabled={this.props.disabled} type="number" value={this.props.programNumber} min="1" max="127" onChange={this.props.programNumberChange}/>
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
