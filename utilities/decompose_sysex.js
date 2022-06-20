import pedalStates from "../data/pedal_states";
import parseSysexToBinary from "./parse_sysex";

export default function decomposeSysex(preset, selectedPedal) {
  let label = preset.label;
  let message = preset.message;
  let initialState = { ...pedalStates[selectedPedal] };
  let heelState = { ...initialState };
  let toeState = { ...initialState };
  let { data, manufacturer } = parseSysexToBinary(message);
  let presetNumber = data[4];
  heelState[14] = data[17]; // Bypass
  heelState[9] = data[18]; // Toggle
  heelState[29] = data[19]; // 4-Way Switch
  heelState[30] = data[20]; // Toggle
  heelState[15] = data[21]; // Tempo, 0 - 120
  heelState[16] = data[5];
  heelState[17] = data[6];
  heelState[18] = data[7];
  heelState[19] = data[8];
  heelState[20] = data[9];
  heelState[21] = data[10];
  heelState[22] = data[11];
  heelState[23] = data[12];
  heelState[24] = data[13];
  heelState[25] = data[14];
  heelState[26] = data[15];
  heelState[27] = data[16];
  toeState[14] = data[17]; // Bypass
  toeState[9] = data[18]; // Toggle
  toeState[29] = data[19]; // 4-Way Switch
  toeState[30] = data[20]; // Toggle
  toeState[15] = data[21]; // Tempo, 0 - 120
  toeState[16] = data[22];
  toeState[17] = data[23];
  toeState[18] = data[24];
  toeState[19] = data[25];
  toeState[20] = data[26];
  toeState[21] = data[27];
  toeState[22] = data[28];
  toeState[23] = data[29];
  toeState[24] = data[30];
  toeState[25] = data[31];
  toeState[26] = data[32];
  toeState[27] = data[33];
  return {
    heelStateInitial: heelState,
    toeStateInitial: toeState,
    presetNumberFromPreset: presetNumber,
    label: label,
  };
}
