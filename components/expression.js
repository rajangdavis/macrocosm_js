import {useState} from 'react'
import sysexKnobsUpdate from '../hooks/sysex_knobs_update'
import parseSysexToBinary from '../utilities/parse_sysex'
export default function Expression(props){
	const {
		expressionVal, 
		setExpressionVal, 
		midiObject, 
		midiData
	} = props;

	const express = (e)=>{
		if(midiObject && midiData.output && midiData.channel){
			let deviceOutput = midiObject.outputs.filter(x =>{
				return x.name == midiData.output
			})[0]
			let parsedVal = parseInt(e.target.value);
			console.log(4, parsedVal, {channels: parseInt(midiData.channel)})
			deviceOutput.sendControlChange(4, parsedVal, {channels: parseInt(midiData.channel)})
			setExpressionVal(parsedVal)
		}
	}

	return(
		<div className="expression-container">
      <div className="expression">
        <input type="range"
               value={expressionVal}
               min="0"
               max="127"
               onChange={(e)=>{ return express(e) }}/>
        <label>
          EXPRESSION
        </label>
      </div>
    </div>
	)
}