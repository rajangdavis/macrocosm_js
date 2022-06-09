import { BigPadButton } from "./pad_button";
import { useState } from 'react'

export default function SwellButton(props) {
  let { midiObject, midiData, swell, mercury7Dispatch } = props;

  const holdOrRelease = () => {
    if (midiObject && midiData.output && midiData.channel) {
      let deviceOutput = props.midiObject.outputs.filter((x) => {
        return x.name == props.midiData.output;
      })[0];
      let newSwellVal = swell == 0 ? 127 : 0;
      mercury7Dispatch({ key: 28, value: newSwellVal });
      console.log(28, newSwellVal, { channels: parseInt(props.midiData.channel) });
      deviceOutput.sendControlChange(28, newSwellVal, {
        channels: parseInt(props.midiData.channel),
      });
    }
  };

  let swellDotStyle = () => {
    let { midiObject, midiData } = props;
    if (midiObject && midiData.output && midiData.channel && swell > 0) {
      return {};
    } else {
      return {display: 'none'};
    }
  };

  return (
    <div className="tap-button-container">
      <BigPadButton
        onClick={holdOrRelease}
        className="tap-button"
        bigButtonlabel="Swell"
      />
      <span className="tempo-dot" style={swellDotStyle()}></span>
    </div>
  );
}
