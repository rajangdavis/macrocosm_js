import { useState, useEffect } from "react";
import { LittleKnob, BigKnob } from "./pedals/knob";
export default function ExpressionMacros(props) {
  const {
    expressionVal,
    setExpressionVal,
    midiObject,
    selectedMacro,
    midiConfig,
    setMacrosModalOpen,
  } = props;

  const express = async (e) => {
    if (Object.keys(selectedMacro).length > 0 && midiObject) {
      let selectedPedals = selectedMacro.data.pedals
        .filter((x) => x.showing)
        .map((x) => x.name);
      console.log(midiConfig);
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiConfig.output;
      })[0];
      let parsedVal = parseInt(e.target.value);
      if (deviceOutput) {
        let expressionResults = await Promise.all(
          selectedPedals.map((x) => {
            let channel = parseInt(midiConfig[`${x}Channel`]);
            return deviceOutput.sendControlChange(4, parsedVal, {
              channels: channel,
            });
          })
        );
        setExpressionVal(parsedVal);
        console.log(expressionResults);
      }
    }
  };

  return (
    <div className="expression-container macros">
      <div className="expression expression-macro">
        <input
          type="range"
          value={expressionVal}
          min="0"
          max="127"
          onChange={(e) => {
            return express(e);
          }}
        />
        <label>EXPRESSION</label>
      </div>
    </div>
  );
}
