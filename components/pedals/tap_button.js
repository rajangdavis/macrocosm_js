import { BigPadButton } from "./pad_button";
import { useState, useRef, useEffect } from "react";

export default function TapButton(props) {
  const [currentTapTime, setCurrentTapTime] = useState(Date.now());
  const prevCurrentTapTimeRef = useRef();

  useEffect(() => {
    prevCurrentTapTimeRef.current = currentTapTime;
  });

  const prevCurrentTapTime = prevCurrentTapTimeRef.current;

  const updateTempo = () => {
    let elaspedTime = currentTapTime - prevCurrentTapTime;
    let estimatedTapTime = Math.min(Math.floor(elaspedTime / 10), 120);
    if (!isNaN(estimatedTapTime) && estimatedTapTime > 0) {
      props.dispatch({ key: 15, value: estimatedTapTime, skipMidi: true });
    }
    setCurrentTapTime(Date.now());
  };

  const tap = () => {
    let { midiObject, midiData } = props;
    if (midiObject && midiData.output && midiData.channel) {
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiData.output;
      })[0];
      console.log(28, 127, { channels: parseInt(props.midiData.channel) });
      deviceOutput.sendControlChange(28, 127, {
        channels: parseInt(props.midiData.channel),
      });
      updateTempo();
    }
  };

  let tempoDotStyle = () => {
    let initStyle = {
      WebkitAnimation: `blink-animation ${
        props.tempo * 10
      }ms steps(1, end) infinite`,
      animationDelay: "3ms",
    };
    let { midiObject, midiData } = props;
    if (midiObject && midiData.output && midiData.channel && props.tempo > 0) {
      return initStyle;
    } else {
      return {};
    }
  };

  return (
    <div className="tap-button-container">
      <BigPadButton onClick={tap} className="tap-button" bigButtonlabel="Tap" />
      <span className="tempo-dot" style={tempoDotStyle()}></span>
    </div>
  );
}
