import parseSysexToBinary from "../utilities/parse_sysex";

export default function MacrosLayout(props) {
  let {
    setSelectedMacro,
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
  return (
    <div className="macro-display">
      {macros.map((macro, i) => {
        return (
          <div
            className="macro"
            key={i}
            onClick={() => {
              callMacro(macro);
            }}
          >
            {macro.data.name}
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
        );
      })}
    </div>
  );
}
