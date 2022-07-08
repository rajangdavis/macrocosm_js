import { BigKnob, InvertedBigKnob } from "./pedals/knob";
export default function Expression(props) {
  const {
    expressionVal,
    selectedPedal,
    setExpressionVal,
    midiObject,
    midiData,
    tempo,
    dispatch,
    invert,
    showExpression,
  } = props;

  const express = (e) => {
    let parsedVal = parseInt(e.target.value);
    dispatch({ key: 4, value: parsedVal });
    setExpressionVal(parsedVal);
  };

  const setTempo = (value) => {
    dispatch({ key: 15, value: value });
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
          maxValue={120}
          setVal={setTempo}
          val={tempo}
        />
      )}
      {invert != true && (
        <BigKnob
          className={merc7Selected}
          label="TEMPO"
          maxValue={120}
          setVal={setTempo}
          val={tempo}
        />
      )}
    </div>
  );
}
