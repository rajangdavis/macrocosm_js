export default function SysexKnobsUpdate(props){
	const {data, dispatch, expression} = props
	dispatch({skipMidi: true, key: 16, value: data[0]})
	dispatch({skipMidi: true, key: 17, value: data[1]})
	dispatch({skipMidi: true, key: 18, value: data[2]})
	dispatch({skipMidi: true, key: 19, value: data[3]})
	dispatch({skipMidi: true, key: 20, value: data[4]})
	dispatch({skipMidi: true, key: 21, value: data[5]})
	dispatch({skipMidi: true, key: 22, value: data[6]})
	dispatch({skipMidi: true, key: 23, value: data[7]})
	dispatch({skipMidi: true, key: 24, value: data[8]})
	dispatch({skipMidi: true, key: 25, value: data[9]})
	dispatch({skipMidi: true, key: 26, value: data[10]})
	dispatch({skipMidi: true, key: 27, value: data[11]})
	if(expression == false){
		dispatch({skipMidi: true, key: 15, value: data[16]})
		dispatch({skipMidi: true, key: 14, value: data[12]})
		dispatch({skipMidi: true, key: 9, value: data[13]})
		dispatch({skipMidi: true, key: 29, value: data[14]})
		dispatch({skipMidi: true, key: 30, value: data[15]})
	}
}