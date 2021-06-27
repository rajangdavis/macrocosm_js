export default function SysexKnobsUpdate(props){
	const {data, dispatch, expression} = props
	const updatedValues = data.slice(5, 22)
	dispatch({skipMidi: true, key: 'pitch', value: updatedValues[0]})
	dispatch({skipMidi: true, key: 'filter', value: updatedValues[1]})
	dispatch({skipMidi: true, key: 'mix', value: updatedValues[2]})
	dispatch({skipMidi: true, key: 'sustain', value: updatedValues[3]})
	dispatch({skipMidi: true, key: 'filterEnv', value: updatedValues[4]})
	dispatch({skipMidi: true, key: 'modulation', value: updatedValues[5]})
	dispatch({skipMidi: true, key: 'portamento', value: updatedValues[6]})
	dispatch({skipMidi: true, key: 'filterType', value: updatedValues[7]})
	dispatch({skipMidi: true, key: 'delayLevel', value: updatedValues[8]})
	dispatch({skipMidi: true, key: 'ringModulation', value: updatedValues[9]})
	dispatch({skipMidi: true, key: 'filterBandwidth', value: updatedValues[10]})
	dispatch({skipMidi: true, key: 'delayFeedback', value: updatedValues[11]})
	if(expression == false){
		dispatch({skipMidi: true, key: 'bypass', value: updatedValues[12]})
		dispatch({skipMidi: true, key: 'envelopeType', value: updatedValues[13]})
		dispatch({skipMidi: true, key: 'synthMode', value: updatedValues[14]})
		dispatch({skipMidi: true, key: 'waveShape', value: updatedValues[15]})
		dispatch({skipMidi: true, key: 'tempo', value: updatedValues[16]})
	}
}