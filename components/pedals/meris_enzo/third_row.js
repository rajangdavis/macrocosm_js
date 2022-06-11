import { LittleKnob } from "../knob";
import WaveShape from "./wave_shape";
import FilterType from "./filter_type";
import TapButton from "../tap_button";
import EnvelopeType from "./envelope_type";
import SynthMode from "./synth_mode";
import Bypass from "../bypass";

export default function ThirdRow(props) {
  let {
    26: filterBandwidth,
    30: waveShape,
    23: filterType,
    9: envelopeType,
    29: synthMode,
    14: bypass,
    15: tempo,
  } = props.enzoState;

  let setFilterBandwidth = (value) => {
    props.enzoDispatch({ key: 26, value: value });
  };

  return (
    <div className="flex-row">
      <div className="left-side-controls">
        <div className="flex-row first-row">
          <WaveShape waveShape={waveShape} enzoDispatch={props.enzoDispatch} />
          <FilterType
            filterType={filterType}
            enzoDispatch={props.enzoDispatch}
          />
        </div>
        <div className="flex-row tap">
          <TapButton
            tempo={tempo}
            midiData={props.midiData}
            midiObject={props.midiObject}
            dispatch={props.enzoDispatch}
          />
        </div>
      </div>
      <div className="flex-row middle-controls">
        <LittleKnob
          className="filter-bandwidth"
          label="Filter Bandwidth"
          setVal={setFilterBandwidth}
          val={filterBandwidth}
        />
      </div>
      <div className="right-side-controls">
        <div className="flex-row first-row">
          <EnvelopeType
            envelopeType={envelopeType}
            enzoDispatch={props.enzoDispatch}
          />
          <SynthMode synthMode={synthMode} enzoDispatch={props.enzoDispatch} />
        </div>
        <Bypass bypass={bypass} dispatch={props.enzoDispatch} />
      </div>
    </div>
  );
}
