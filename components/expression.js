import {useState} from 'react'
export default function Expression(props){

	const [expressionVal, setExpressionVal] = useState(0);
	const tap = ()=>{
		let {midiObject, midiData} = props;
		if(midiObject && midiData.output && midiData.channel){
			let deviceOutput = props.midiObject.outputs.filter(x =>{
				return x.name == props.midiData.output
			})[0]
			console.log(4, 127, {channels: parseInt(props.midiData.channel)})
			deviceOutput.sendControlChange(4, 127, {channels: parseInt(props.midiData.channel)})
		}
	}

	return(
		<div className="expression-container">
      <div className="expression">
        <input type="range"
               value={expressionVal}
               min="0"
               max="127"
               onChange={(e)=>{ return setExpressionVal(e.target.value)}}/>
        <label>
          EXPRESSION
        </label>
      </div>
    </div>
	)
}