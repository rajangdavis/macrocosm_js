export default function CustomSlider(props) {
  return (
    <div className="custom-slider-container">
      <label>{props.label}</label>
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
