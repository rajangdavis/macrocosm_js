import Image from "next/image";
import cloneDeep from "lodash/cloneDeep";
// import mobiusImage from "../public/mobius_button.svg";
// import mobiusImageSelected from "../public/mobius_button_selected.svg";
import { MidiConfigContext } from "../hooks/midi_config";
import { useContext } from "react";

export default function MacrosDeviceSelector(props) {
  const { midiConfig } = useContext(MidiConfigContext);

  let { showOrHidePedal, pedals } = props;

  const selectedPedals = pedals.map((pedal) => {
    const copiedState = cloneDeep(pedal);
    return copiedState;
  });

  return (
    <div className="macros pedal-selector">
      {selectedPedals
        .filter((x) => parseInt(midiConfig[`${x["name"]}Channel`]) > 0)
        .map((pedal) => {
          let className =
            pedal.showing == true ? "selected pedal-option" : "pedal-option";
          let iconSource =
            pedal.showing == true ? pedal.iconSourceSelected : pedal.iconSource;
          return (
            <div key={pedal.name} id={pedal.name}>
              <a
                className={className}
                onClick={() => {
                  showOrHidePedal(pedal);
                }}
              >
                <Image
                  alt={pedal.name}
                  src={iconSource}
                  width="146"
                  height="146"
                />
              </a>
            </div>
          );
        })}
    </div>
  );
}
