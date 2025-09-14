import { WebMidiContext } from "../hooks/web_midi_state";
import { useContext, useEffect, useState } from "react";

export default function MidiOutputSelect(props) {
  let { midiObject, updateWebMidi } = useContext(WebMidiContext);
  const [selectOpen, setSelectOpen] = useState(false);
  let closeIf = props.closeIf == undefined ? true : props.closeIf;
  const [selectedOption, setSelectedOption] = useState(props.defaultOption);
  let containerClass =
    selectedOption == "" ? "custom-select" : "custom-select selected";
  let arrowClass = selectOpen ? "select-selected open" : "select-selected";
  let optionsClass = selectOpen ? "select-options open" : "select-options";
  let openOrCloseSelect = () => {
    setSelectOpen(!selectOpen);
  };
  let setOption = (option) => {
    setSelectedOption(option);
    if (props.onChange) {
      props.onChange(option);
    }
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (midiObject != undefined) {
      setOptions(midiObject[props.option].map((x) => x.name));
    }
  }, [midiObject]);

  useEffect(() => {
    if (closeIf == false) {
      setSelectOpen(false);
    }
  }, [closeIf]);

  let remainingOptions = options.filter((x) => x != selectedOption);

  return (
    <div className={containerClass} onClick={openOrCloseSelect}>
      <label className="custom-select">{props.inputLabel}</label>
      <div className={arrowClass}>{selectedOption}</div>
      {selectOpen && (
        <div className={optionsClass}>
          {remainingOptions.map((option, i) => {
            if (option != selectedOption) {
              return (
                <div
                  key={i}
                  className="custom-select-option"
                  onClick={() => setOption(option)}
                >
                  {option}
                </div>
              );
            }
          })}
          {options.length == 0 && (
            <div className="custom-select-option" onClick={updateWebMidi}>
              No options available
            </div>
          )}
          {options.length > 0 && remainingOptions.length == 0 && (
            <div className="custom-select-option" onClick={updateWebMidi}>
              No other options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
