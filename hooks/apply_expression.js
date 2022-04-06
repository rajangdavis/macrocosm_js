import sysexKnobsUpdate from "./sysex_knobs_update";
import parseSysexToBinary from "../utilities/parse_sysex";
import expressionSysex from "../utilities/expression_sysex";

export default function applyExpression(
  midiObject,
  midiData,
  expressionVal,
  preset,
  selectedPedalDispatch
) {
  if (midiObject && midiData.output && midiData.channel) {
    let { manufacturer, data } = parseSysexToBinary(preset.message);
    let deviceOutput = midiObject.outputs.filter((x) => {
      return x.name == midiData.output;
    })[0];
    let presetValWithExpression = expressionSysex(data, expressionVal);
    sysexKnobsUpdate({
      data: presetValWithExpression.slice(5, 22),
      dispatch: selectedPedalDispatch,
    });
  }
}
