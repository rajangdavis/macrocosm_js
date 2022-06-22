import parseSysexToBinary from "./parse_sysex";

export default async function callMacro(props) {
  let { macro, setSelectedMacro, midiConfig, midiObject } = props;

  setSelectedMacro(macro);
  let macroData = macro.data;
  let macroSelectedPedals = macroData.pedals.filter(
    (x) => x.showing == true && x.selectedPreset != {}
  );
  let notSelectedPedals = macroData.pedals.filter((x) => x.showing == false);

  let macroMessageData = macroSelectedPedals.map((x) => {
    let message = parseSysexToBinary(x.selectedPreset.message);
    return {
      name: x.name,
      channel: midiConfig[`${x.name}Channel`],
      message: message,
    };
  });

  let turnOffThesePedals = notSelectedPedals.map((x) => {
    return { name: x.name, channel: midiConfig[`${x.name}Channel`] };
  });

  let deviceOutput = midiObject.outputs.filter((x) => {
    return x.name == midiConfig.output;
  })[0];

  if (deviceOutput) {
    const results = await Promise.all(
      turnOffThesePedals
        .map((x) => {
          console.log("TURNING OFF PEDAL: " + x.name);
          return deviceOutput.sendControlChange(14, 0, {
            channels: parseInt(x.channel),
          });
        })
        .concat(
          macroMessageData.map((x) => {
            console.log("TURNING ON PRESET, RESETTING EXPRESSION: " + x.name);
            return [
              deviceOutput.sendControlChange(4, 0, {
                channels: parseInt(x.channel),
              }),
              deviceOutput.sendControlChange(14, 127, {
                channels: parseInt(x.channel),
              }),
              deviceOutput.sendSysex(x.message.manufacturer, x.message.data),
            ];
          })
        )
    );
    console.log(results);
  }
}
