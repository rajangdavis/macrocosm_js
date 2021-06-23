export default function SysexKnobsUpdate(props){
	const {data, dispatch} = props
	const updatedValues = data.slice(5, 22)
	props.dispatch({skipMidi: true, key: 'pitch', value: updatedValues[0]})
	props.dispatch({skipMidi: true, key: 'filter', value: updatedValues[1]})
	props.dispatch({skipMidi: true, key: 'mix', value: updatedValues[2]})
	props.dispatch({skipMidi: true, key: 'sustain', value: updatedValues[3]})
	props.dispatch({skipMidi: true, key: 'filterEnv', value: updatedValues[4]})
	props.dispatch({skipMidi: true, key: 'modulation', value: updatedValues[5]})
	props.dispatch({skipMidi: true, key: 'portamento', value: updatedValues[6]})
	props.dispatch({skipMidi: true, key: 'filterType', value: updatedValues[7]})
	props.dispatch({skipMidi: true, key: 'delayLevel', value: updatedValues[8]})
	props.dispatch({skipMidi: true, key: 'ringModulation', value: updatedValues[9]})
	props.dispatch({skipMidi: true, key: 'filterBandwidth', value: updatedValues[10]})
	props.dispatch({skipMidi: true, key: 'delayFeedback', value: updatedValues[11]})
	props.dispatch({skipMidi: true, key: 'bypass', value: updatedValues[12]})
	props.dispatch({skipMidi: true, key: 'envelopeType', value: updatedValues[13]})
	props.dispatch({skipMidi: true, key: 'synthMode', value: updatedValues[14]})
	props.dispatch({skipMidi: true, key: 'waveShape', value: updatedValues[15]})
	props.dispatch({skipMidi: true, key: 'tempo', value: updatedValues[16]})
}