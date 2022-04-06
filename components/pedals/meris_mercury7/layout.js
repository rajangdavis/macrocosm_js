import FirstRow from "./first_row";
import SecondRow from "./second_row";
import ThirdRow from "./third_row";

export default function MerisMercury7Layout(props) {
  let { state, dispatch, midiObject, midiData } = props;

  return (
    <>
      <div className="meris-pedal meris-mercury7-bigbox">
        <FirstRow
          midiObject={midiObject}
          mercury7State={state}
          mercury7Dispatch={dispatch}
        />
        <SecondRow
          midiObject={midiObject}
          mercury7State={state}
          mercury7Dispatch={dispatch}
        />
        <ThirdRow
          midiObject={midiObject}
          midiData={midiData}
          mercury7State={state}
          mercury7Dispatch={dispatch}
        />
      </div>
    </>
  );
}
