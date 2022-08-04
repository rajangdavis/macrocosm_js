import Bypass from "../bypass";
import { BigKnob } from "../knob";
import DynamicBody from "./dynamic_body";
import CustomSelect from "../../custom_select";

export default function StrymonMobiusLayout(props) {
  let { state, dispatch } = props;

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

  /* PRESET CREATION FUNCTIONS START */

  // const hexToAscii = (hexCode) => {
  //   var hex = hexCode.toString();
  //   var str = "";
  //   for (var n = 0; n < hex.length; n += 2) {
  //     str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  //   }
  //   return str;
  // };

  // const hexToName = (hexVals) => {
  //   let cleanHexVals = hexVals.replaceAll(" ", "");
  //   let splitHexVals = cleanHexVals.split(/(?<=^(?:.{2})+)(?!$)/);
  //   return splitHexVals
  //     .map((x) => hexToAscii(x))
  //     .join("")
  //     .trim();
  // };

  // const nameToHex = (hexVals) => {
  //   let splitVals = hexVals.split("").slice(0, 15);
  //   while (splitVals.length < 16) {
  //     splitVals.push(" ");
  //   }
  //   let parsedVals = splitVals.map((x) => x.toUpperCase().charCodeAt(0).toString(16));
  //   return parsedVals.join(" ");
  // };

  // const checkSumCalc = (sysexString) => {
  //   // grab the sysex string
  //   // from index 9 and up
  //   // get 639 chars
  //   let vals = sysexString.replaceAll(" ", "").split(/(?<=^(?:.{2})+)(?!$)/);
  //   let newVals = vals.map((x) => parseInt(x, 16));
  //   var accum = 0;
  //   for (var i = 0; i < newVals.length; i++) {
  //     accum += newVals[i];
  //     if (accum > 127) {
  //       accum -= 128;
  //     }
  //   }
  //   return accum.toString(16);
  // };

  /* PRESET CREATION FUNCTIONS END */

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
