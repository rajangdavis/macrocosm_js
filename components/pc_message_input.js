module.exports = {
  PcMessageInput: (props) => {
    let propsCopy = { ...props, includeCc: false };
    return PcMessageInput(propsCopy);
  },
  PcMessageInputWithCc: (props) => {
    let propsCopy = { ...props, includeCc: true };
    return PcMessageInput(propsCopy);
  },
};

function PcMessageInput(props) {
  let {
    device,
    setSelectedPreset,
    maxValue,
    minValue,
    includeCc,
    setSelectedCcVal,
  } = props;

  let updateSelectedPreset = function (val) {
    if (val.change) {
      let defaultVal = device.selectedPreset ? device.selectedPreset : 0;
      var newVal = defaultVal + val.by;
    } else if (val.overwrite) {
      var newVal = parseInt(val.overwrite);
    }
    var newState =
      newVal < minValue ? minValue : newVal > maxValue ? maxValue : newVal;
    setSelectedPreset(newState);
  };

  let updateSelectedCcVal = function (val) {
    if (val.change) {
      let defaultVal = device.selectedCcVal ? device.selectedCcVal : -1;
      var newVal = defaultVal + val.by;
    } else if (val.overwrite) {
      var newVal = parseInt(val.overwrite);
    }
    var newState;
    if(newVal < -1 || newVal == 34){
      newState = -1;
    }else if(newVal > -1 && newVal < 35){
      newState = 35;
    }else if(newVal > 42){
      newState = 42;
    }else{
      newState = newVal
    }
    setSelectedCcVal(newState);
  };

  return (
    <>
      <div className="flex-row device-input-container">
        <label onClick={() => updateSelectedPreset({ change: true, by: -1 })}>
          -
        </label>
        <label className={"device-input"}>
          <span>{device.name}:</span>
          <input
            type="number"
            value={device.selectedPreset}
            onChange={(e) => {
              updateSelectedPreset({ overwrite: e.target.value });
            }}
          />
        </label>
        <label onClick={() => updateSelectedPreset({ change: true, by: 1 })}>
          +
        </label>
      </div>
      {includeCc == true && (
        <div className="flex-row device-input-container">
          <label onClick={() => updateSelectedCcVal({ change: true, by: -1 })}>
            -
          </label>
          <label className={"device-input"}>
            <span>{device.name} CC Value:</span>
            <input
              type="number"
              value={device.selectedCcVal || 35}
              onChange={(e) => {
                updateSelectedCcVal({ overwrite: e.target.value });
              }}
            />
          </label>
          <label onClick={() => updateSelectedCcVal({ change: true, by: 1 })}>
            +
          </label>
        </div>
      )}
    </>
  );
}
