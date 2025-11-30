import { BigKnob, InvertedBigKnob } from "./pedals/knob";
export default function Expression(props) {
  const {
    expressionVal,
    selectedPedal,
    setExpressionVal,
    selectedPedalState,
    setPresetTempoVal,
    dispatch,
    invert,
    tempo,
    showExpression,
  } = props;

  let tempoCcVal = selectedPedal == "mobius" ? 17 : 15;

  if (selectedPedalState) {
    var selectedPedalTempo =
      selectedPedal == "mobius"
        ? selectedPedalState[17]
        : selectedPedalState[15];
  }

  let tempoComputed = tempo != undefined ? tempo : selectedPedalTempo;
  let expressCcVal = selectedPedal == "mobius" ? 100 : 4;
  let tempoMaxValue = selectedPedal == "mobius" ? 127 : 120;

  const express = (e) => {
    let parsedVal = parseInt(e.target.value);
    dispatch({ key: expressCcVal, value: parsedVal });
    setExpressionVal(parsedVal);
  };

  const setTempo = (value) => {
    dispatch({ key: tempoCcVal, value: value });
    setPresetTempoVal(value);
  };

  const merc7Selected = selectedPedal == "mercury7" ? "hidden" : "tempo";
  const expressionClassName = showExpression != false ? "expression" : "hidden";

  return (
    <div className="expression-container">
      <div className={expressionClassName}>
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
      {invert == true && (
        <InvertedBigKnob
          className={merc7Selected}
          label="TEMPO"
          maxValue={tempoMaxValue}
          setVal={setTempo}
          val={tempoComputed}
        />
      )}
      {invert != true && (
        <BigKnob
          className={merc7Selected}
          label="TEMPO"
          maxValue={tempoMaxValue}
          setVal={setTempo}
          val={tempoComputed}
        />
      )}
    </div>
  );
}
