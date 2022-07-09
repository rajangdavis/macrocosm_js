import { useEffect } from "react";
import Image from "next/image";
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

export default function PedalSelector(props) {
  let {
    midiConfig,
    selectedPedal,
    setSelectedPreset,
    setSelectedPedal,
    setSysexByte,
  } = props;

  const pedalSelectAndOrder = [
    {
      key: "hedra",
      label: "Hedra",
      sysexByte: 4,
      iconSource: hedraImage,
      iconSourceSelected: hedraImageSelected,
    },
    {
      key: "enzo",
      label: "Enzo",
      sysexByte: 3,
      iconSource: enzoImage,
      iconSourceSelected: enzoImageSelected,
    },
    {
      key: "polymoon",
      label: "Polymoon",
      sysexByte: 2,
      iconSource: polymoonImage,
      iconSourceSelected: polymoonImageSelected,
    },
    {
      key: "mercury7",
      label: "Mercury7",
      sysexByte: 1,
      iconSource: mercury7Image,
      iconSourceSelected: mercury7ImageSelected,
    },
    {
      key: "ottobitJr",
      label: "Ottobit Jr.",
      sysexByte: 0,
      iconSource: ottobitJrImage,
      iconSourceSelected: ottobitJrImageSelected,
    },
    {
      key: "mobius",
      label: "Ottobit Jr.",
      sysexByte: 0,
      iconSource: ottobitJrImage,
      iconSourceSelected: ottobitJrImageSelected,
    },
  ];

  useEffect(() => {
    setSelectedPreset({ label: null, message: null });
  }, [selectedPedal]);

  return (
    <>
      {pedalSelectAndOrder
        .filter((x) => parseInt(midiConfig[`${x["key"]}Channel`]) > 0)
        .map((pedal) => {
          let className =
            selectedPedal == pedal["key"]
              ? "selected pedal-option"
              : "pedal-option";
          let iconSource =
            selectedPedal == pedal["key"]
              ? pedal.iconSourceSelected
              : pedal.iconSource;
          let changePedal = (e, pedal) => {
            setSelectedPedal(pedal["key"]);
            setSysexByte(pedal["sysexByte"]);
          };
          return (
            <div
              key={pedal.key}
              id={pedal.key}
              onDragOver={(ev) => ev.preventDefault()}
            >
              <a className={className} onClick={(e) => changePedal(e, pedal)}>
                <Image
                  alt={pedal.key}
                  src={iconSource}
                  width="146"
                  height="146"
                />
              </a>
            </div>
          );
        })}
    </>
  );
}
