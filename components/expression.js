import { useState, useEffect } from "react";
import { BigKnob } from "./pedals/knob";
export default function Expression(props) {
  const {
    expressionVal,
    selectedPedal,
    setExpressionVal,
    midiObject,
    midiData,
    tempo,
    dispatch,
  } = props;

  // useEffect(() => {
  //   if (
  //     midiData.inputForExpression != "" &&
  //     midiData.output &&
  //     midiObject &&
  //     midiObject.inputs &&
  //     midiData.channel != 0
  //   ) {
  //     let deviceInput = midiObject.inputs.filter((x) => {
  //       return x.name == midiData.inputForExpression;
  //     })[0];
  //     if (deviceInput) {
  //       const sendExpressData = (e) => {
  //         if (e.statusByte && e.statusByte == 176) {
  //           let val = e.data[2];
  //           e.target = {
  //             value: val,
  //           };
  //           express(e);
  //         }
  //       };
  //       deviceInput.addListener("midimessage", sendExpressData);
  //     }
  //   }
  // }, [
  //   midiData.inputForExpression,
  //   midiData.output,
  //   midiData.channel,
  //   midiObject,
  //   express,
  // ]);

  const express = (e) => {
    if (midiObject && midiData.output && midiData.channel) {
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiData.output;
      })[0];
      let parsedVal = parseInt(e.target.value);
      deviceOutput.sendControlChange(4, parsedVal, {
        channels: parseInt(midiData.channel),
      });
      setExpressionVal(parsedVal);
    }
  };

  const setTempo = (value) => {
    dispatch({ key: 15, value: value });
  };

  const merc7Selected = selectedPedal == "mercury7" ? "hidden" : "tempo";

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
        className={merc7Selected}
        label="TEMPO"
        setVal={setTempo}
        val={tempo}
      />
    </div>
  );
}
