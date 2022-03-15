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
import MerisEnzoLayout from "../components/pedals/meris_enzo/layout";
import MerisHedraLayout from "../components/pedals/meris_hedra/layout";
import MerisPolymoonLayout from "../components/pedals/meris_polymoon/layout";
import MerisOttobitJrLayout from "../components/pedals/meris_ottobit_jr/layout";
import MerisMercury7Layout from "../components/pedals/meris_mercury7/layout";
import ModalOpenButton from "../components/modal_open_button";
import PresetsModal from "../components/presets_modal";
import useLocalStorage from "../hooks/use_local_storage";
import { MidiConfigContext } from "../hooks/midi_config";
import Expression from "../components/expression";
import { useState, useContext, useEffect } from "react";

export default function Pedals(props) {
  const [selectedPedal, setSelectedPedal] = useLocalStorage(
    "selected_pedal",
    "enzo"
  );
  const [expressionVal, setExpressionVal] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState({
    label: null,
    message: null,
  });
  const [pedalSelectAndOrder, setPedalSelectAndOrder] = useLocalStorage(
    "pedals_to_select",
    [
      {
        key: "enzo",
        label: "Enzo",
        sysexByte: 3,
        order: 1,
        iconSource: enzoImage,
        iconSourceSelected: enzoImageSelected,
      },
      {
        key: "hedra",
        label: "Hedra",
        sysexByte: 4,
        order: 2,
        iconSource: hedraImage,
        iconSourceSelected: hedraImageSelected,
      },
      {
        key: "polymoon",
        label: "Polymoon",
        sysexByte: 2,
        order: 3,
        iconSource: polymoonImage,
        iconSourceSelected: polymoonImageSelected,
      },
      {
        key: "mercury7",
        label: "Mercury7",
        sysexByte: 1,
        order: 4,
        iconSource: mercury7Image,
        iconSourceSelected: mercury7ImageSelected,
      },
      {
        key: "ottobitJr",
        label: "Ottobit Jr.",
        sysexByte: 0,
        order: 5,
        iconSource: ottobitJrImage,
        iconSourceSelected: ottobitJrImageSelected,
      },
    ]
  );

  const [sysexByte, setSysexByte] = useState(1);
  const [dragId, setDragId] = useState();
  const [presetsOpen, setPresetsOpen] = useState(false);
  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };
  const handleDrop = (ev) => {
    const dragBox = pedalSelectAndOrder.find((pedal) => pedal.key === dragId);
    const dropBox = pedalSelectAndOrder.find(
      (pedal) => pedal.key === ev.currentTarget.id
    );

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newPedalOrder = pedalSelectAndOrder.map((pedal) => {
      if (pedal.key === dragId) {
        pedal.order = dropBoxOrder;
      }
      if (pedal.key === ev.currentTarget.id) {
        pedal.order = dragBoxOrder;
      }
      return pedal;
    });

    setPedalSelectAndOrder(newPedalOrder);
  };

  const { midiConfig } = useContext(MidiConfigContext);
  const midiData = {
    channel: midiConfig[`${selectedPedal}Channel`],
    output: midiConfig.output,
    inputForExpression: midiConfig.inputForExpression,
  };

  useEffect(() => {
    setExpressionVal(0);
    setSelectedPreset({ label: null, message: null });
  }, [pedalSelectAndOrder, selectedPedal]);

  useEffect(() => {
    setExpressionVal(0);
  }, [selectedPreset]);

  return (
    <div className="container fade-in">
      <div className="view-port">
        <div className="pedal-selector">
          {pedalSelectAndOrder
            .sort((a, b) => a.order - b.order)
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
                  draggable="true"
                  onDragStart={handleDrag}
                  onDrop={handleDrop}
                >
                  <a
                    className={className}
                    onClick={(e) => changePedal(e, pedal)}
                  >
                    <Image
                      alt="selectedPedal"
                      src={iconSource}
                      width="146"
                      height="146"
                    />
                  </a>
                </div>
              );
            })}
        </div>
        <div className="main-display">
          <ModalOpenButton
            presetsOpen={presetsOpen}
            setPresetsOpen={setPresetsOpen}
          />
          <MerisEnzoLayout
            expressionVal={expressionVal}
            selectedPedal={selectedPedal}
            selectedPreset={selectedPreset}
            midiObject={props.midiObject}
          />
          <MerisHedraLayout
            expressionVal={expressionVal}
            selectedPedal={selectedPedal}
            selectedPreset={selectedPreset}
            midiObject={props.midiObject}
          />
          <MerisPolymoonLayout
            expressionVal={expressionVal}
            selectedPedal={selectedPedal}
            selectedPreset={selectedPreset}
            midiObject={props.midiObject}
          />
          <MerisMercury7Layout
            expressionVal={expressionVal}
            selectedPedal={selectedPedal}
            selectedPreset={selectedPreset}
            midiObject={props.midiObject}
          />
          <MerisOttobitJrLayout
            expressionVal={expressionVal}
            selectedPedal={selectedPedal}
            selectedPreset={selectedPreset}
            midiObject={props.midiObject}
          />
        </div>
        <Expression
          expressionVal={expressionVal}
          setExpressionVal={setExpressionVal}
          midiData={midiData}
          midiObject={props.midiObject}
          pedalSelectAndOrder={pedalSelectAndOrder}
        />
      </div>
      {presetsOpen && (
        <PresetsModal
          selectedPedal={selectedPedal}
          expressionVal={expressionVal}
          sysexByte={sysexByte}
          midiObject={props.midiObject}
          setPresetsOpen={setPresetsOpen}
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
        />
      )}
    </div>
  );
}
