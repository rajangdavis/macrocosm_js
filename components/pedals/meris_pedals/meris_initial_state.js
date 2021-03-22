export default function MerisInitialState(props, pedalFunctions){
  let newDate = Date.now()
  let initialState = {
    pedal_id: newDate,
    macro_id: props.macro_id,
    midi_device_id: props.midi_device_id,
    active: true,
    presets_active: false,
    presets_val: 0,
    alt_mode: false,
    midi_channel: "1",
    midi_preset: "1",
    input_port: "",
    output_port: ""
  }

  Object.keys(pedalFunctions).map((key)=>{
    let notDupedKnob = key[key.length - 1] != "_"
    if (pedalFunctions[key].ccValue && notDupedKnob)
      initialState[key] = {
        ccValue: pedalFunctions[key].ccValue,
        value: 0,
      }
  });
  return initialState;
}

