import callMacro from "../utilities/call_macro";

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
            <a
              className={isSelected(macro)}
              onClick={() => {
                callMacro({macro: macro, setSelectedMacro: setSelectedMacro, midiConfig: midiConfig, midiObject: midiObject});
              }}
            >
              <span className="macro-name">{macro.data.name}</span>
            </a>
            <div className="macro-controls">
              <a
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
