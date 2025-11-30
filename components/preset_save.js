export default function PresetSave(props) {
  let {
    setPresetName,
    selectedPedal,
    presetName,
    setPresetNumber,
    presetNumber,
    createPreset,
    showPresetSave,
    setShowPresetSave,
  } = props;

  let buttonLabel = showPresetSave ? "⇓" : "⇑";

  return (
    <>
      <div
        className={"preset-save button"}
        onClick={() => setShowPresetSave(!showPresetSave)}
      >
        {buttonLabel}
      </div>
      <div
        className={
          selectedPedal != "mobius"
            ? showPresetSave
              ? "fade-in preset-save"
              : "hidden"
            : "hidden"
        }
      >
        <div className="text-input">
          <span>Preset Name</span>
          <input
            type="text"
            value={presetName}
            onChange={(e) => {
              setPresetName(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="preset-input">
          <label>Preset Number</label>
          <input
            type="number"
            min="1"
            max="16"
            value={parseInt(presetNumber)}
            onChange={(e) => {
              setPresetNumber(e.target.value);
            }}
          />
        </div>
        <br />
        <a
          onClick={() => {
            return createPreset();
          }}
        >
          Save Preset
        </a>
      </div>
    </>
  );
}
