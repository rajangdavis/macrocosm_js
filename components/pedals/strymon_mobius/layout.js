import Bypass from "../bypass";
// import { LittleKnob } from "../knob"
import CustomSelect from "../../custom_select";

export default function StrymonMobiusLayout(props) {
  let { state, dispatch /* midiObject, midiData */ } = props;

  let { 102: bypass } = state;

  const options = [
    "Chorus",
    "Flanger",
    "Rotary",
    "Vibe",
    "Phaser",
    "Filter",
    "Formant",
    "Vintage Trem",
    "Pattern Trem",
    "AutoSwell",
    "Destroyer",
    "Quadrature",
  ];

  const setTypeEncoder = (value) => {
    let ccVal = options.findIndex((x) => x == value);
    props.dispatch({ key: 19, value: ccVal });
  };

  return (
    <>
      <div className="meris-pedal strymon-mobius-bigbox">
        <div className="right-side-controls">
          <CustomSelect
            inputLabel="Type Encoder"
            options={options}
            defaultOption={options[0]}
            onChange={setTypeEncoder}
          />
          <Bypass keyVal={102} bypass={bypass} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
}
