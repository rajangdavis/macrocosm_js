import Image from "next/image";
import cloneDeep from "lodash/cloneDeep";
import mobiusImage from "../public/mobius_button.svg";
import mobiusImageSelected from "../public/mobius_button_selected.svg";
import es8Image from "../public/es8_button.svg";
import es8ImageSelected from "../public/es8_button_selected.svg";
import quadCortexImage from "../public/quad_cortex_button.svg";
import quadCortexImageSelected from "../public/quad_cortex_button_selected.svg";
import { MidiConfigContext } from "../hooks/midi_config";
import { useContext } from "react";

export default function MacrosDeviceSelector(props) {
  const { midiConfig } = useContext(MidiConfigContext);

  let { showOrHidePedal, pedals } = props;

  const selectedPedals = pedals.map((pedal) => {
    const copiedState = cloneDeep(pedal);
    if (pedal.name == "mobius") {
      copiedState.iconSource = mobiusImage;
      copiedState.iconSourceSelected = mobiusImageSelected;
    }

    if (pedal.name == "es8") {
      copiedState.iconSource = es8Image;
      copiedState.iconSourceSelected = es8ImageSelected;
    }

    if (pedal.name == "quadCortex") {
      copiedState.iconSource = quadCortexImage;
      copiedState.iconSourceSelected = quadCortexImageSelected;
    }

    return copiedState;
  });

  return (
    <div className="macros device-selector">
      <div className="img-placeholder"></div>
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
      <div className="img-placeholder"></div>
    </div>
  );
}
