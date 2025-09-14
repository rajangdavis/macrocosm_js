import parseSysexToBinary from "./parse_sysex";

export default async function callMacro(props) {
  let { macro, setSelectedMacro, midiConfig, midiObject } = props;

  setSelectedMacro(macro);
  let macroData = macro.data;
  let macroSelectedPedals = macroData.pedals.filter(
    (x) => x.showing == true && x.selectedPreset != {}
  );

  let mobiusConfig = macroData.devices.filter((x) => x.name == "mobius")[0];
  let es8Config = macroData.devices.filter((x) => x.name == "es8")[0];
  let quadCortexConfig = macroData.devices.filter(
    (x) => x.name == "quadCortex"
  )[0];

  let mobiusOnOrOff = mobiusConfig.showing == true ? 127 : 0;

  let notSelectedPedals = macroData.pedals.filter((x) => x.showing == false);

  let macroMessageData = macroSelectedPedals.map((x) => {
    let message = x.selectedPreset.message
      ? parseSysexToBinary(x.selectedPreset.message)
      : false;
    return {
      name: x.name,
      channel: midiConfig[`${x.name}Channel`],
      messageLabel: x.selectedPreset.label,
      message: message,
    };
  });

  let pcMessageData = macroSelectedPedals.map((x) => {
    let message = x.selectedPreset.message
      ? parseSysexToBinary(x.selectedPreset.message)
      : false;
    return {
      programChange: message.data[4],
      channel: midiConfig[`${x.name}Channel`],
    };
  });

  let turnOffThesePedals = notSelectedPedals.map((x) => {
    console.log("TURNING OFF: " + x.name);
    return parseInt(midiConfig[`${x.name}Channel`]);
  });

  let deviceConfig = macroData.devices.filter(
    (x) => x.showing == true && x.selectedPreset > 0
  );

  let deviceOutput = midiObject.outputs.filter((x) => {
    return x.name == midiConfig.output;
  })[0];

  let buildMobiusCommands = () => {
    let onOffState = mobiusOnOrOff == 0 ? "OFF" : "ON";
    console.log(`TURNING MOBIUS ${onOffState}`);

    let mobiusCommands = [
      deviceOutput.sendControlChange(102, mobiusOnOrOff, {
        channels: parseInt(midiConfig["mobiusChannel"]),
      }),
    ];

    if (mobiusOnOrOff > 0) {
      let commandVal = mobiusConfig.selectedPreset > 127 ? 1 : 0;
      let normalizedVal =
        mobiusConfig.selectedPreset > 127
          ? mobiusConfig.selectedPreset - 127
          : mobiusConfig.selectedPreset;
      console.log(`SENDING MOBIUS CC #0: ${commandVal}`);
      console.log(`SENDING MOBIUS PC CHANGE: ${mobiusConfig.selectedPreset}`);
      mobiusCommands.concat([
        deviceOutput.sendControlChange(0, commandVal, {
          channels: parseInt(midiConfig["mobiusChannel"]),
        }),
        deviceOutput.sendProgramChange(normalizedVal, {
          channels: parseInt(midiConfig["mobiusChannel"]),
        }),
      ]);
    }
    return mobiusCommands;
  };

  let buildEs8Commands = () => {
    console.log(`SENDING ES8 PC CHANGE: ${es8Config.selectedPreset}`);
    return [
      deviceOutput.sendProgramChange(es8Config.selectedPreset, {
        channels: parseInt(midiConfig["es8Channel"]),
      }),
    ];
  };

  let buildQuadCortexCommands = () => {
    var commands = [];
    if (quadCortexConfig.selectedPreset > -1) {
      let commandVal = quadCortexConfig.selectedPreset > 127 ? 1 : 0;
      let normalizedVal =
        quadCortexConfig.selectedPreset > 127
          ? quadCortexConfig.selectedPreset - 127
          : quadCortexConfig.selectedPreset;
      console.log(
        `SENDING QUAD CORTEX PRESET: ${quadCortexConfig.selectedPreset}`
      );

      commands = [
        deviceOutput.sendControlChange(0, commandVal, {
          channels: parseInt(midiConfig["quadCortexChannel"]),
        }),
        deviceOutput.sendProgramChange(quadCortexConfig.selectedPreset, {
          channels: parseInt(midiConfig["quadCortexChannel"]),
        }),
      ];
    }

    if (quadCortexConfig.selectedCcVal > -1) {
      console.log(
        `SENDING QUAD CORTEX CC VAL: ${quadCortexConfig.selectedCcVal}`
      );
      commands.push(
        deviceOutput.sendControlChange(quadCortexConfig.selectedCcVal, 127, {
          channels: parseInt(midiConfig["quadCortexChannel"]),
        })
      );
    }

    return commands;
  };

  let buildPromises = () => {
    let firstPass = [
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
      // pcMessageData.map((x) => {
      //   console.log(
      //     `SENDING PC COMMANDS: PC - ${x.programChange} to Channel ${x.channel}`
      //   );
      //   return deviceOutput.sendProgramChange(x.programChange, {
      //     channels: parseInt(x.channel),
      //   });
      // }),
      macroMessageData
        .filter((x) => {
          console.log("TURNING ON PRESET, RESETTING EXPRESSION: " + x.name);
          if (x.message.data)
            console.log(`SENDING SYSEX FOR: ${x.name} - ${x.messageLabel}`);
          return x.message.data;
        })
        .map((x) => {
          return deviceOutput.sendSysex(x.message.manufacturer, x.message.data);
        })
    );

    if (parseInt(midiConfig["quadCortexChannel"]) > 0) {
      firstPass.concat(buildQuadCortexCommands());
    }
    if (parseInt(midiConfig["mobiusChannel"]) > 0) {
      firstPass.concat(buildMobiusCommands());
    }
    if (parseInt(midiConfig["es8Channel"]) > 0 && es8Config.showing == true) {
      firstPass.concat(buildEs8Commands());
    }
    return firstPass;
  };

  if (deviceOutput) {
    const results = await Promise.all(buildPromises());
  }
}
