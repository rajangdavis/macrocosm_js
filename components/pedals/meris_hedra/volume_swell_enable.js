import { SmallPadButton } from "../pad_button";

export default function VolumeSwellEnable(props) {
  const isSelected = (value) => {
    return props.volumeSwellEnable == value ? "selected" : "";
  };

  const setVolumeSwellEnable = (value) => {
    props.dispatch({ key: 31, value: value });
  };
  return (
    <div className="text-center volume-swell-enable">
      <div className="flex-row">
        <SmallPadButton
          label="On"
          className={isSelected(127)}
          onClick={() => setVolumeSwellEnable(127)}
        />
        <SmallPadButton
          label="Off"
          className={isSelected(0)}
          onClick={() => setVolumeSwellEnable(0)}
        />
      </div>
      <label>Volume Swell Enable</label>
    </div>
  );
}
