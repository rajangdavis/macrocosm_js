export default async function turnOffAllPedals(props) {
  let { setSelectedMacro, midiConfig, midiObject } = props;
  setSelectedMacro({});
  let pedalChannels = Object.keys(midiConfig)
    .filter((x) => x.indexOf("Channel") > -1)
    .filter((x) => midiConfig[x] < 6);
  let deviceOutput = midiObject.outputs.filter((x) => {
    return x.name == midiConfig.output;
  })[0];

  let turnOffThesePedals = pedalChannels.map((x) => {
    return midiConfig[x];
  });

  if (deviceOutput) {
    const results = await Promise.all([
      deviceOutput.sendControlChange(14, 0, {
        channels: turnOffThesePedals,
      }),
    ]);
    console.log(results);
  }
}
