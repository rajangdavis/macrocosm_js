import { SmallPadButton } from "../pad_button";

export default function WaveShape(props) {
  const isSelected = (val) => {
    return props.waveShape == val ? "selected" : "";
  };

  let setWaveShape = (value) => {
    props.enzoDispatch({ key: 30, value: value });
  };
  return (
    <div className="text-center wave-shape">
      <SmallPadButton
        className={isSelected(0)}
        onClick={() => setWaveShape(0)}
        label="SAW"
      />
      <SmallPadButton
        className={isSelected(127)}
        onClick={() => setWaveShape(127)}
        label="SQUARE"
      />
      <label>Waveshape</label>
    </div>
  );
}
