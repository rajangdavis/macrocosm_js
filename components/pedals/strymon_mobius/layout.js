import Bypass from "../bypass";
import { BigKnob } from "../knob";
import DynamicBody from "./dynamic_body";
import CustomSelect from "../../custom_select";
import { useState } from "react";

export default function StrymonMobiusLayout(props) {
  let { state, dispatch } = props;
  let [presetVal, setPresetVal] = useState(0);

  let {
    102: bypass,
    19: encoderType,
    18: depth,
    15: level,
    9: param1,
    16: param2,
  } = state;

  const options = [
    "Chorus",
    "Flanger",
    "Rotary",
    "Vibe",
    "Phaser",
    "Filter",
    "Formant",
    "Vintage Trem",
    "Pattern Trem",
    "AutoSwell",
    "Destroyer",
    "Quadrature",
  ];

  const setVal = (key, value) => {
    dispatch({ key: key, value: value });
  };

  const setTypeEncoder = (value) => {
    let ccVal = options.findIndex((x) => x == value);
    dispatch({ key: 19, value: ccVal });
  };

  const hex_to_ascii = (hexCode) => {
    var hex = hexCode.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  };

  const hexToName = (hexVals) => {
    let cleanHexVals = hexVals.replaceAll(" ", "");
    let splitHexVals = cleanHexVals.split(/(?<=^(?:.{2})+)(?!$)/);
    return splitHexVals
      .map((x) => hex_to_ascii(x))
      .join("")
      .trim();
  };

  const nameToHex = (hexVals) => {
    let splitVals = hexVals.split("").slice(0, 15);
    while (splitVals.length < 16) {
      splitVals.push(" ");
    }
    let test = splitVals.map((x) => x.toUpperCase().charCodeAt(0).toString(16));
    return test.join(" ");
  };

  window.nameToHex = nameToHex;
  window.hexToName = hexToName;

  const checkSumCalc = () => {
    // grab the sysex string
    // from index 9 and up
    // get 639 chars
    let test =
      "07 203F 7B01 7F2C 404E 5629 0B0C 0D0E 0F10 0111 0A02 0000 0102 0001 0201 0101 0101 0007 4901 007F 3F3F 3F3F 3F3F 3F3F 3F3F 3F3F 3F3F 1213 1415 1617 1801 0201 0201 0004 2349 270D 0C0D 0E0F 1011 1213 1415 1617 1819 1A1B 1C1D 1E1F 2021 2223 2425 2627 2829 2A2B 2C2D 2E2F 3031 3233 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F02 4655 434b 2054 4845 2057 4f52 4c44 2020";
    let vals = test.replaceAll(" ", "").split(/(?<=^(?:.{2})+)(?!$)/);
    let newVals = vals.map((x) => parseInt(x, 16));
    var blah = 0;
    for (var i = 0; i < newVals.length; i++) {
      blah += newVals[i];
      if (blah > 127) {
        blah -= 128;
      }
    }
    return blah.toString(16);
  };

  window.checkSumCalc = checkSumCalc;

  const test = (e) => {
    let parsedVal = parseInt(e.target.value);
    let finalParsedVal = parsedVal > 127 ? parsedVal - 1 - 127 : parsedVal;
    console.log("parsedVal:", parsedVal);
    console.log("finalParsedVal:", finalParsedVal);
    var value = parsedVal > 127 ? 1 : 0;
    console.log("value:", value);
    dispatch({ key: 0, value: value, pcValue: finalParsedVal });
    setPresetVal(parsedVal);

    // let testSysex = `F0 00 01 55 12 02 63 00 00 F7`
    // let testSysex = `f0 00 01 55 12 02 62 00 00 02 1d1f 7f01 542c 4d4e 5629 0b0c 0d0e 0f10 0100 0401 0101 0101 0101 0201 0101 0101 0003 5f01 007f 3f3f 3f3f 3f3f 3f3f 3f3f 3f3f 3f3f 1213 1415 1617 1801 0200 0100 0004 1f3d 4a2c 0c0d 0e0f 1011 1213 1415 1617 1819 1a1b 1c1d 1e1f 2021 2223 2425 2627 2829 2a2b 2c2d 2e2f 3031 3233 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f7f 7f02 5354 4152 4c49 4748 5420 2020 2020 2020 7ef7`
    // let testSysex = `F0 00 01 55 12 02 62 00 00 07 203F 7B01 7F2C 404E 5629 0B0C 0D0E 0F10 0111 0A02 0000 0102 0001 0201 0101 0101 0007 4901 007F 3F3F 3F3F 3F3F 3F3F 3F3F 3F3F 3F3F 1213 1415 1617 1801 0201 0201 0004 2349 270D 0C0D 0E0F 1011 1213 1415 1617 1819 1A1B 1C1D 1E1F 2021 2223 2425 2627 2829 2A2B 2C2D 2E2F 3031 3233 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F02 4341 4C4C 2054 4845 2043 4F50 5320 2020 55F7`
    // let testSysex = `F0 00 01 55 12 02 62 00 00 07 203F 7B01 7F2C 404E 5629 0B0C 0D0E 0F10 0111 0A02 0000 0102 0001 0201 0101 0101 0007 4901 007F 3F3F 3F3F 3F3F 3F3F 3F3F 3F3F 3F3F 1213 1415 1617 1801 0201 0201 0004 2349 270D 0C0D 0E0F 1011 1213 1415 1617 1819 1A1B 1C1D 1E1F 2021 2223 2425 2627 2829 2A2B 2C2D 2E2F 3031 3233 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F7F 7F02 4655 434b 2054 4845 2057 4f52 4c44 2020 15F7`
    // let testSysex = `F0 00 01 55 12 02 22 F7`
    // let {data, manufacturer} = parseSysexToBinary(testSysex)
    // dispatch({skipMidi: true, sysex: {data: data, manufacturer: manufacturer}});
  };

  return (
    <>
      <div className="meris-pedal strymon-mobius-bigbox">
        <div className="right-side-controls">
          <CustomSelect
            inputLabel="Type Encoder"
            options={options}
            defaultOption={options[encoderType]}
            onChange={setTypeEncoder}
          />
          <div className="flex-row" style={{ zIndex: 2 }}>
            <BigKnob
              className="depth"
              label="Depth"
              setVal={(value) => {
                return setVal(18, value);
              }}
              val={depth}
            />
            <BigKnob
              className="level"
              label="Level"
              setVal={(value) => {
                return setVal(15, value);
              }}
              val={level}
            />
            <BigKnob
              className="param1"
              label="Param 1"
              setVal={(value) => {
                return setVal(9, value);
              }}
              val={param1}
            />
            <BigKnob
              className="param2"
              label="Param 2"
              setVal={(value) => {
                return setVal(16, value);
              }}
              val={param2}
            />
          </div>
          <br />
          <input
            type="number"
            min={0}
            max={99}
            onChange={test}
            value={presetVal}
          />
          <br />
          <div style={{ zIndex: 2 }}>
            <DynamicBody encoderType={encoderType} {...props} />
          </div>
          <Bypass keyVal={102} bypass={bypass} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
}
//
