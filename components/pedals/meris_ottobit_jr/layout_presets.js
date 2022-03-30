import FirstRow from "./first_row";
import SecondRow from "./second_row";
import ThirdRow from "./third_row";

export default function MerisOttobitJrLayout(props) {
  let { state, dispatch, midiObject, midiData } = props;
  return (
    <>
      <div className="meris-pedal meris-ottobit-jr-bigbox">
        <FirstRow
          midiObject={midiObject}
          ottobitJrState={state}
          ottobitJrDispatch={dispatch}
        />
        <SecondRow
          midiObject={midiObject}
          ottobitJrState={state}
          ottobitJrDispatch={dispatch}
        />
        <ThirdRow
          midiObject={midiObject}
          midiData={midiData}
          ottobitJrState={state}
          ottobitJrDispatch={dispatch}
        />
      </div>
    </>
  );
}
