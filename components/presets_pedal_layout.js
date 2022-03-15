import MerisEnzoLayoutPresets from "./pedals/meris_enzo/layout_presets";
export default function PresetsPedalLayout(props) {
  let { selectedPedal, state, dispatch, midiObject, midiData } = props;
  if (selectedPedal == "enzo") {
    return (
      <MerisEnzoLayoutPresets
        state={state}
        dispatch={dispatch}
        midiObject={midiObject}
        midiData={midiData}
      />
    );
  } else {
    return "something else";
  }
}
