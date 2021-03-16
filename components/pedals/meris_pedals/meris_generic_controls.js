import GenericKnob from '../../generic_knob'
import GenericButton from '../../generic_button'
import GroupableButtons from '../../groupable_buttons'

export default function MerisGenericControls(props){

	let pedalFunctions = props.pedalData.pedalFunctions
	let midiChannel = props.midiChannel
  let pedalName = props.pedalData.label

	let componentsByLocation = (location)=>{
    return Object.keys(pedalFunctions).filter((control, i) =>{
      let localControl = pedalFunctions[control];
      if(localControl.className && localControl.className.indexOf(location) == 0){
        return localControl;
      }
    });
  }

  let fetchComponentByType = (localControl, key, i)=>{
    if(localControl.type == 'knob'){
      return (<GenericKnob pedalName={pedalName} controlChange={props.controlChange(key)} className={localControl.className} key={i} mappedTo={localControl} deviceOutput={props.deviceOutput} midiChannel={midiChannel}/>)
    }else if(localControl.type == 'groupable_button'){
      return (<GroupableButtons pedalName={pedalName} controlChange={props.controlChange(key)} className={localControl.className} key={i} mappedTo={localControl} deviceOutput={props.deviceOutput} midiChannel={midiChannel} />)
    }else if(localControl.type == 'button'){
      let buttonType = localControl.alt == true ? 'alt' : '';
      return (<GenericButton pedalName={pedalName} controlChange={props.controlChange(key)} className={localControl.className} key={i} mappedTo={localControl} deviceOutput={props.deviceOutput} midiChannel={midiChannel}  buttonType={buttonType} changeAltState={props.changeAltState} />)
    }
  }


	let direction = props.direction
	return (<div className={`${direction}-controls`}>
            {
              componentsByLocation(direction).map((key,i) =>{
                let localControl = pedalFunctions[key];
                return fetchComponentByType(localControl, key, i)
            })}
            </div>)
}