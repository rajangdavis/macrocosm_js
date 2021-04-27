import { useImmerReducer } from "use-immer";
// import { WebMidi } from "webmidi"

export default function EnzoState(initialState, props = {}){

  let reducer = (state, action) =>{
    state[action.key].value = action.value
  	if(props.midiObject && props.midiChannel && props.midiOutput){
  		let ccValue = state[action.key].ccValue;
  		let {midiObject, midiChannel, midiOutput} = props;
  		let deviceOutput = midiObject.outputs.filter(x =>{
  			return x.name == midiOutput
  		})[0]
  		console.log(ccValue, action.value, {channels: midiChannel})
  		deviceOutput.sendControlChange(ccValue, action.value, {channels: parseInt(midiChannel)})
  	}
  }

	return useImmerReducer(reducer, initialState)
}
