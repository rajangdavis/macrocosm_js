export default async function turnOffAllPedals(props){
	console.log(props)
	let {
    setSelectedMacro,
    midiConfig,
    midiObject
  } = props;
  setSelectedMacro({});
  let pedalChannels = Object.keys(midiConfig).filter((x) => x.indexOf("Channel") > -1)
  let deviceOutput = midiObject.outputs.filter((x) => {
    return x.name == midiConfig.output;
  })[0];

  let turnOffThesePedals = pedalChannels.map(x =>{
  	return {name: x.replace("Channel", ""), channel: x};
  })

  if (deviceOutput) {
	  const results = await Promise.all(
      turnOffThesePedals
        .map((x) => {
          console.log("TURNING OFF PEDAL: " + x.name);
          return deviceOutput.sendControlChange(14, 0, {
            channels: parseInt(x.channel),
          });
        })
    );
    console.log(results);
  }
}