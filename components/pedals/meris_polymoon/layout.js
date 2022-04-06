import FirstRow from "./first_row";
import SecondRow from "./second_row";
import ThirdRow from "./third_row";

export default function MerisPolymoonLayout(props) {
  let { state, dispatch, midiObject, midiData } = props;

  return (
    <>
      <div className="meris-pedal meris-polymoon-bigbox">
        <FirstRow
          midiObject={midiObject}
          polymoonState={state}
          polymoonDispatch={dispatch}
        />
        <SecondRow
          midiObject={midiObject}
          polymoonState={state}
          polymoonDispatch={dispatch}
        />
        <ThirdRow
          midiObject={midiObject}
          midiData={midiData}
          polymoonState={state}
          polymoonDispatch={dispatch}
        />
      </div>
    </>
  );
}
