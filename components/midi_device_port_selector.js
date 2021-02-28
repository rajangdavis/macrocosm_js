import DropDown from '../components/dropdown' 
import PedalBoardTamerDropDown from '../components/pedal_board_tamer_dropdown' 
import React from 'react'

export default class MidiDevicePortSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		
    return (
      <div>
        <select onChange={this.props.portChange}>
          <option value="">Pick an {this.props.label}</option>
          {this.props.ports().map(port => (
            <option key={port.name} value={port.name}>{port.name}</option>
          ))}
        </select>
        <style jsx>{`

        `}</style>
      </div>
    )
  }
}


