import { WidePadButton } from "../pad_button";

export default function SequencerType(props) {
  const isSelected = (value) => {
    return props.sequencerType == value ? "selected" : "";
  };

  const setSequencerType = (value) => {
    props.ottobitJrDispatch({ key: 28, value: value });
  };

  return (
    <div className="text-center sequencer-type">
      <WidePadButton
        onClick={() => setSequencerType(0)}
        className={isSelected(0)}
        label="Pitch"
      />
      <WidePadButton
        onClick={() => setSequencerType(63)}
        className={isSelected(63)}
        label="Sample Rate"
      />
      <WidePadButton
        onClick={() => setSequencerType(127)}
        className={isSelected(127)}
        label="Filter"
      />
      <label>Sequencer Type</label>
    </div>
  );
}
