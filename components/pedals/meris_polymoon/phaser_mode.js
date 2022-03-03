import { SmallPadButton } from "../pad_button";

export default function PhaserMode(props) {
  const isSelected = (value) => {
    return props.phaserMode == value ? "selected" : "";
  };

  const setPhaserMode = (value) => {
    props.polymoonDispatch({ key: 29, value: value });
  };

  return (
    <div className="text-center phaser-mode">
      <div className="flex-row">
        <SmallPadButton
          onClick={() => setPhaserMode(127)}
          className={isSelected(127)}
          label="1/4 Note"
        />
        <SmallPadButton
          onClick={() => setPhaserMode(95)}
          className={isSelected(95)}
          label="Whole Note"
        />
      </div>
      <div className="flex-row">
        <SmallPadButton
          onClick={() => setPhaserMode(63)}
          className={isSelected(63)}
          label="Slow"
        />
        <SmallPadButton
          onClick={() => setPhaserMode(0)}
          className={isSelected(0)}
          label="Off"
        />
      </div>
      <label>Phaser Mode</label>
    </div>
  );
}
