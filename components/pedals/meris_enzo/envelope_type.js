import { WidePadButton } from "../pad_button";

export default function EnvelopeType(props) {
  const isSelected = (lb, ub) => {
    let lowerBoundCheck = lb <= props.envelopeType;
    let upperBoundCheck = props.envelopeType <= ub;
    let withinBounds = lowerBoundCheck && upperBoundCheck;
    let withinBoundsAndNotNull = props.envelopeType != null && withinBounds;
    return withinBoundsAndNotNull ? "selected" : "";
  };

  const setEnvelopeType = (value) => {
    props.enzoDispatch({ key: 9, value: value });
  };

  return (
    <div className="text-center envelope-type">
      <WidePadButton
        label="Triggered"
        className={isSelected(0, 63)}
        onClick={() => setEnvelopeType(63)}
      />
      <WidePadButton
        label="Follower"
        className={isSelected(64, 127)}
        onClick={() => setEnvelopeType(64)}
      />
      <label>Envelope Type</label>
    </div>
  );
}
