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
    let message = x.selectedPreset.message
      ? parseSysexToBinary(x.selectedPreset.message)
      : false;
    return {
      name: x.name,
      channel: midiConfig[`${x.name}Channel`],
      message: message,
    };
  });

  let turnOffThesePedals = notSelectedPedals.map((x) => {
    console.log("TURNING OFF: " + x.name);
    return parseInt(midiConfig[`${x.name}Channel`]);
  });

  let deviceOutput = midiObject.outputs.filter((x) => {
    return x.name == midiConfig.output;
  })[0];

  let buildPromises = () => {
    return [
      deviceOutput.sendControlChange(14, 0, {
        channels: turnOffThesePedals,
      }),
      deviceOutput.sendControlChange(4, 0, {
        channels: macroMessageData.map((x) => parseInt(x.channel)),
      }),
      deviceOutput.sendControlChange(14, 127, {
        channels: macroMessageData.map((x) => parseInt(x.channel)),
      }),
    ].concat(
      macroMessageData
        .filter((x) => {
          console.log("TURNING ON PRESET, RESETTING EXPRESSION: " + x.name);
          if (x.message.data) console.log("SENDING SYSEX FOR: " + x.name);
          return x.message.data;
        })
        .map((x) => {
          console.log(x);
          return deviceOutput.sendSysex(x.message.manufacturer, x.message.data);
        })
    );
  };

  if (deviceOutput) {
    const results = await Promise.all(buildPromises());
    console.log(results);
  }
}
