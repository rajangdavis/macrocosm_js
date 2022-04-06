import FirstRow from "./first_row";

export default function MerisHedraLayout(props) {
  let { state, dispatch, midiObject, midiData } = props;
  return (
    <>
      <div className="meris-pedal meris-hedra-bigbox">
        <FirstRow
          midiData={midiData}
          midiObject={midiObject}
          hedraState={state}
          hedraDispatch={dispatch}
        />
      </div>
    </>
  );
}
