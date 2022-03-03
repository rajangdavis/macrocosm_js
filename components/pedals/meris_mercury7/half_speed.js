import { SmallPadButton } from "../pad_button";

export default function HalfSpeed(props) {
  const isSelected = (lb, ub) => {
    let lowerBoundCheck = lb <= props.halfSpeed;
    let upperBoundCheck = props.halfSpeed <= ub;
    let withinBounds = lowerBoundCheck && upperBoundCheck;
    let withinBoundsAndNotNull = props.halfSpeed != null && withinBounds;
    return withinBoundsAndNotNull ? "selected" : "";
  };

  const setHalfSpeed = (value) => {
    props.polymoonDispatch({ key: 31, value: value });
  };
  return (
    <div className="text-center half-speed">
      <SmallPadButton
        label="ON"
        className={isSelected(64, 127)}
        onClick={() => setHalfSpeed(64)}
      />
      <SmallPadButton
        label="OFF"
        className={isSelected(0, 63)}
        onClick={() => setHalfSpeed(63)}
      />
      <label>Half Speed</label>
    </div>
  );
}
