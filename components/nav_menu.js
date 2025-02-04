import SliderControls from "./slider_controls";
import MidiOutputSelect from "./midi_output_select";
import MenuKnob from "./menu_knob";
import MidiChannelInput from "./midi_channel_input";
import { MidiConfigContext } from "../hooks/midi_config";
import { SliderStateContext } from "../hooks/slider_state";
import { useContext } from "react";

export default function NavMenu(props) {
  const { midiConfig, updateConfig } = useContext(MidiConfigContext);
  const { sliderState, updateSliderState } = useContext(SliderStateContext);

  const updateMidiOutput = (option) => {
    updateConfig("output", option);
  };
  const updateMidiInput = (option) => {
    updateConfig("input", option);
  };

  const outputOptions =
    props.midiObject != undefined
      ? props.midiObject.outputs.map((x) => x.name)
      : [];

  const inputOptions =
    props.midiObject != undefined
      ? props.midiObject.inputs.map((x) => x.name)
      : [];

  return (
    <div className="nav-menu open fade-in">
      <div className="options-block">
        <label>MIDI OPTIONS</label>
        <div className="midi-options">
          <MidiOutputSelect
            onChange={updateMidiOutput}
            defaultOption={midiConfig.output}
            closeIf={props.headerOpen}
            inputLabel={"MIDI OUTPUT"}
            options={outputOptions}
          />
          <MidiOutputSelect
            onChange={updateMidiInput}
            defaultOption={midiConfig.input}
            closeIf={props.headerOpen}
            inputLabel={"MIDI INPUT"}
            options={inputOptions}
          />
          <label>MIDI CHANNELS</label>
          <div className="channels-container">
            <div className="channels-block">
              <MidiChannelInput
                label={"ENZO"}
                midiConfig={midiConfig}
                value={"enzoChannel"}
                updateConfig={updateConfig}
              />
              <MidiChannelInput
                label={"HEDRA"}
                midiConfig={midiConfig}
                value={"hedraChannel"}
                updateConfig={updateConfig}
              />
              <MidiChannelInput
                label={"POLYMOON"}
                midiConfig={midiConfig}
                value={"polymoonChannel"}
                updateConfig={updateConfig}
              />
              <MidiChannelInput
                label={"MERCURY7"}
                midiConfig={midiConfig}
                value={"mercury7Channel"}
                updateConfig={updateConfig}
              />
              <MidiChannelInput
                label={"OTTOBIT JR"}
                midiConfig={midiConfig}
                value={"ottobitJrChannel"}
                updateConfig={updateConfig}
              />
            </div>
          </div>
          <div className="channels-block">
            <MidiChannelInput
              label={"MOBIUS"}
              midiConfig={midiConfig}
              value={"mobiusChannel"}
              updateConfig={updateConfig}
            />
            <MidiChannelInput
              label={"ES8"}
              midiConfig={midiConfig}
              value={"es8Channel"}
              updateConfig={updateConfig}
            />
            <MidiChannelInput
              label={"Quad Cortex"}
              midiConfig={midiConfig}
              value={"quadCortexChannel"}
              updateConfig={updateConfig}
            />
          </div>
        </div>
      </div>
      <div className="options-block">
        <label>CONTROL OPTIONS</label>
        <div className="control-options">
          <SliderControls
            sliderData={sliderState}
            setSliderData={updateSliderState}
          />
          <MenuKnob
            sliderData={sliderState}
            setSliderData={updateSliderState}
          />
        </div>
      </div>
    </div>
  );
}
