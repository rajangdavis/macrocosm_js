import { useState, useEffect } from "react";

export default function CustomSelect(props) {
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

  useEffect(() => {
    if (closeIf == false) {
      setSelectOpen(false);
    }
  }, [closeIf]);

  let remainingOptions = props.options.filter((x) => x != selectedOption);

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
          {props.options.length == 0 && (
            <div className="custom-select-option">No options available</div>
          )}
          {props.options.length > 0 && remainingOptions.length == 0 && (
            <div className="custom-select-option">
              No other options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
