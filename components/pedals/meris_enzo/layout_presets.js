import FirstRow from "./first_row";
import SecondRow from "./second_row";
import ThirdRow from "./third_row";

export default function MerisEnzoLayoutPresets(props) {
  let { state, dispatch, midiObject, midiData } = props;

  return (
    <>
      <div className="meris-pedal meris-enzo-bigbox">
        <FirstRow
          midiObject={midiObject}
          enzoState={state}
          enzoDispatch={dispatch}
        />
        <SecondRow
          midiObject={midiObject}
          enzoState={state}
          enzoDispatch={dispatch}
        />
        <ThirdRow
          midiObject={midiObject}
          midiData={midiData}
          enzoState={state}
          enzoDispatch={dispatch}
        />
      </div>
    </>
  );
}
