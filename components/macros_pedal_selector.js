import Image from "next/image";
import cloneDeep from "lodash/cloneDeep";
import enzoImage from "../public/enzo_button.svg";
import enzoImageSelected from "../public/enzo_button_selected.svg";
import hedraImage from "../public/hedra_button.svg";
import hedraImageSelected from "../public/hedra_button_selected.svg";
import polymoonImage from "../public/polymoon_button.svg";
import polymoonImageSelected from "../public/polymoon_button_selected.svg";
import mercury7Image from "../public/mercury7_button.svg";
import mercury7ImageSelected from "../public/mercury7_button_selected.svg";
import ottobitJrImage from "../public/ottobit_jr_button.svg";
import ottobitJrImageSelected from "../public/ottobit_jr_button_selected.svg";
import { MidiConfigContext } from "../hooks/midi_config";
import { useContext } from "react";

export default function MacrosPedalSelector(props) {
  const { midiConfig } = useContext(MidiConfigContext);

  let { showOrHidePedal, pedals } = props;

  const selectedPedals = pedals.map((pedal) => {
    const copiedState = cloneDeep(pedal);
    if (pedal.name == "enzo") {
      copiedState.iconSource = enzoImage;
      copiedState.iconSourceSelected = enzoImageSelected;
    }

    if (pedal.name == "hedra") {
      copiedState.iconSource = hedraImage;
      copiedState.iconSourceSelected = hedraImageSelected;
    }

    if (pedal.name == "polymoon") {
      copiedState.iconSource = polymoonImage;
      copiedState.iconSourceSelected = polymoonImageSelected;
    }

    if (pedal.name == "mercury7") {
      copiedState.iconSource = mercury7Image;
      copiedState.iconSourceSelected = mercury7ImageSelected;
    }

    if (pedal.name == "ottobitJr") {
      copiedState.iconSource = ottobitJrImage;
      copiedState.iconSourceSelected = ottobitJrImageSelected;
    }

    return copiedState;
  });

  return (
    <div className="macros pedal-selector">
      {selectedPedals
        .filter((x) => parseInt(midiConfig[`${x["name"]}Channel`]) > 0)
        .filter((x) => x.name != "mobius")
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
