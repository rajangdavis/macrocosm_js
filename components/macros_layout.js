import parseSysexToBinary from "../utilities/parse_sysex";

export default function MacrosLayout(props) {
  let {
    setSelectedMacro,
    selectedMacro,
    macros,
    macroDispatch,
    setMacroToEdit,
    midiConfig,
    midiObject,
    setMacrosModalEditOpen,
  } = props;

  const callMacro = async (macro) => {
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
              console.log("TURNING ON PRESET: " + x.name);
              return [
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
  };

  const isSelected = (macro) => {
    return macro.macro_id == selectedMacro.macro_id
      ? "macro selected"
      : "macro";
  };

  return (
    <div className="macro-display">
      {macros.map((macro, i) => {
        return (
          <div key={i}>
            <div
              className={isSelected(macro)}
              onClick={() => {
                callMacro(macro);
              }}
            >
              <span className="macro-name">{macro.data.name}</span>
            </div>
            <div className="macro-controls">
              <a
                href="#"
                onClick={() => {
                  macroDispatch({
                    type: "remove-macro",
                    macro_id: macro.macro_id,
                  });
                }}
              >
                remove
              </a>
              |
              <a
                href="#"
                onClick={() => {
                  macroDispatch({
                    type: "clone-macro",
                    macro_id: macro.macro_id,
                  });
                }}
              >
                clone
              </a>
              |
              <a
                href="#"
                onClick={() => {
                  setMacroToEdit(macro);
                  setMacrosModalEditOpen(true);
                }}
              >
                edit
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
