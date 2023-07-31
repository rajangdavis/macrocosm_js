export default async function turnOffAllPedals(props) {
  let { setSelectedMacro, midiConfig, midiObject } = props;
  setSelectedMacro({});
  let merisPedalChannels = Object.keys(midiConfig).filter(
    (x) =>
      x.indexOf("Channel") > -1 &&
      !["es8Channel", "mobiusChannel", "quadCortexChannel"].includes(x)
  );
  let mobiusChannel = midiConfig["mobiusChannel"];
  let deviceOutput = midiObject.outputs.filter((x) => {
    return x.name == midiConfig.output;
  })[0];
  let quadCortexChannel = midiConfig["quadCortexChannel"];
  const quadCortexReset = () => {
    console.log("Resetting Quad Cortext on channels:", quadCortexChannel);
    return [
      deviceOutput.sendControlChange(35, 127, {
        channels: quadCortexChannel,
      }),
      deviceOutput.sendProgramChange(0, {
        channels: quadCortexChannel,
      }),
    ];
  };

  const merisOff = () => {
    let merisChannels = merisPedalChannels.map((x) => midiConfig[x]);
    console.log("Turning off Meris Pedals on channels:", merisChannels);
    return deviceOutput.sendControlChange(14, 0, {
      channels: merisChannels,
    });
  };
  const strymonOff = () => {
    console.log("Turning off Mobius Pedal on channel:", mobiusChannel);
    return deviceOutput.sendControlChange(102, 0, {
      channels: mobiusChannel,
    });
  };

  if (deviceOutput) {
    const results = await Promise.all([
      quadCortexReset(),
      merisOff(),
      strymonOff(),
    ]);
    console.log(results);
  }
}
