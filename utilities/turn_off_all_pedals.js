export default async function turnOffAllPedals(props) {
  let { setSelectedMacro, midiConfig, midiObject } = props;
  setSelectedMacro({});
  let merisPedalChannels = Object.keys(midiConfig)
    .filter((x) => x.indexOf("Channel") > -1 && x.indexOf("es8") == -1 && x.indexOf("mobius") == -1);
  let mobiusChannel = midiConfig["mobiusChannel"];
  let deviceOutput = midiObject.outputs.filter((x) => {
    return x.name == midiConfig.output;
  })[0];

  const merisOff = ()=>{
    let merisChannels = merisPedalChannels.map((x) => midiConfig[x])
    console.log("Turning off Meris Pedals on channels:", merisChannels)
    return deviceOutput.sendControlChange(14, 0, {
      channels: merisChannels
    });
  }
  const strymonOff = ()=>{
    console.log("Turning off Mobius Pedal on channel:", mobiusChannel)
    return deviceOutput.sendControlChange(102, 0, {
      channels: mobiusChannel,
    })
  }

  if (deviceOutput) {
    const results = await Promise.all([
      merisOff(),
      strymonOff()
    ]);
    console.log(results);
  }
}
