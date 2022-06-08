import { WidePadButton } from "../pad_button";

export default function ReverbAlgorithm(props) {
  const isSelected = (lb, ub) => {
    let lowerBoundCheck = lb <= props.reverbAlgorithm;
    let upperBoundCheck = props.reverbAlgorithm <= ub;
    let withinBounds = lowerBoundCheck && upperBoundCheck;
    let withinBoundsAndNotNull = props.reverbAlgorithm != null && withinBounds;
    return withinBoundsAndNotNull ? "selected" : "";
  };

  const setAlgorithm = (value) => {
    props.mercury7Dispatch({ key: 29, value: value });
  };

  return (
    <div className="text-center algorithm">
      <WidePadButton
        onClick={() => setAlgorithm(127)}
        className={isSelected(64, 127)}
        label="Cathedra"
      />
      <WidePadButton
        onClick={() => setAlgorithm(0, 63)}
        className={isSelected(0, 63)}
        label="Utlraplate"
      />
      <label>Algorithm</label>
    </div>
  );
}
