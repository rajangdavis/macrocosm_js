import React, {useState } from 'react'
import MerisMidiIo from './midi_devices/meris_midi_io' 
import PedalBoardTamerDropDown from './midi_devices/pedal_board_tamer_dropdown'
import MerisMidiIoHooks from './midi_devices/meris_midi_io_hooks' 
import PedalBoardTamerDropDownHooks from './midi_devices/pedal_board_tamer_dropdown_hooks'
// Figure out why this is broken...
// {PedalBoardTamerDropDown(midiObject, inputValues, outputValues )}

export default function MacroButton(props){
  console.log(props.buttonData)
  console.log(props.dispatch)
	// const [selectedMidiDevices, setSelectedMidiDevices] = useState([]);
 //  const [isToggled, setToggled] = useState(false);
 //  const toggleTrueFalse = () => setToggled(!isToggled);
 //  const addDeviceToMacro = (device) =>{
 //  	let midiDevice = device.component;
 //    let newComponents = selectedMidiDevices.concat([ midiDevice])
 //    setSelectedMidiDevices(newComponents);
 //  }

  // {selectedMidiDevices.map((device) => { return device(midiObject) })}
  //     <div>
  //     <h1>Add MIDI Devices</h1>
  //       <div onClick={ toggleTrueFalse }>
  //         Add MIDI Device
  //       </div>
  //       <div className={isToggled ? '' : 'hidden'}>
  //         {midiDevices.map((md, i) =>{
  //           return <p key={i} onClick={ () => addDeviceToMacro(md) }> {md.label}</p>
  //         })}
  //       </div>
  //     </div>
      // <PedalBoardTamerDropDown />
  let removeMacro = () => props.dispatch({ type: 'remove', id: props.buttonData.id })

  return (
    <div className="macro">
      <div onClick={removeMacro}>Delete</div>
      <PedalBoardTamerDropDown midiObject={props.midiObject} inputValues={ props.midiObject.inputValues } outputValues={ props.midiObject.outputValues }/>
      <MerisMidiIo midiObject={props.midiObject} inputValues={ props.midiObject.inputValues } outputValues={ props.midiObject.outputValues }/>
    </div>
  )

}
