import { SmallPadButton } from "../pad_button";

export default function DottedEighth(props) {
  const isSelected = (val) => {
    return props.dottedEighth == val ? "selected" : "";
  };

  let setWaveShape = (value) => {
    props.polymoonDispatch({ key: 9, value: value });
  };
  return (
    <div className="text-center dotted-eighth">
      <SmallPadButton
        className={isSelected(0)}
        onClick={() => setWaveShape(0)}
        label="1/4 Note"
      />
      <SmallPadButton
        className={isSelected(127)}
        onClick={() => setWaveShape(127)}
        label="Dotted 8th"
      />
      <label>Dotted Eighth</label>
    </div>
  );
}
