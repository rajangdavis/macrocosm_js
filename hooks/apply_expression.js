import sysexKnobsUpdate from "./sysex_knobs_update";
import parseSysexToBinary from "../utilities/parse_sysex";
import expressionSysex from "../utilities/expression_sysex";

export default function applyExpression(
  midiObject,
  midiData,
  expressionVal,
  preset,
  selectedPedalDispatch,
  state
) {
  if (midiObject && midiData.output && midiData.channel) {
    let { _, data } = parseSysexToBinary(preset.message);
    let presetValWithExpression = expressionSysex(data, expressionVal);
    // don't change bypass in this universe
    presetValWithExpression[17] = state[14];
    sysexKnobsUpdate({
      data: presetValWithExpression.slice(5, 22),
      dispatch: selectedPedalDispatch,
    });
  }
}
