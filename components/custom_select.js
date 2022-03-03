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

  return (
    <div className={containerClass} onClick={openOrCloseSelect}>
      <label>{props.inputLabel}</label>
      <div className={arrowClass}>{selectedOption}</div>
      {selectOpen && (
        <div className={optionsClass}>
          {props.options.map((option, i) => {
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
        </div>
      )}
    </div>
  );
}
