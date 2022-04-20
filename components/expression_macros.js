import { useState, useEffect } from "react";
import { BigKnob } from "./pedals/knob";
export default function ExpressionMacros(props) {
  const {
    expressionVal,
    setExpressionVal,
    midiObject,
    selectedMacro,
    midiConfig,
    macroTempo,
    setMacroTempo,
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

  const tempoChange = async (val) => {
    if (Object.keys(selectedMacro).length > 0 && midiObject) {
      let selectedPedals = selectedMacro.data.pedals
        .filter((x) => x.showing)
        .map((x) => x.name);
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiConfig.output;
      })[0];
      if (deviceOutput) {
        let macroTempoResults = await Promise.all(
          selectedPedals.map((x) => {
            let channel = parseInt(midiConfig[`${x}Channel`]);
            return deviceOutput.sendControlChange(15, val, {
              channels: channel,
            });
          })
        );
        setMacroTempo(val);
        console.log(macroTempoResults);
      }
    }
  };

  return (
    <div className="expression-container">
      <div className="expression">
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
      <BigKnob
        className="tempo"
        label="TEMPO"
        setVal={(val) => {
          tempoChange(val);
        }}
        val={macroTempo}
      />
    </div>
  );
}
