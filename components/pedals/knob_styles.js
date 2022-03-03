module.exports = {
  littleKnobContainer: {
    position: "relative",
    width: "132px",
    height: "95px",
  },
  bigKnobContainer: {
    position: "relative",
    width: "118px",
    height: "118px",
  },
  littleKnobDial: {
    position: "absolute",
    zIndex: 2,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderBottom: "14px solid white",
    left: "42.35%",
    right: "45.82%",
    top: "6.66%",
    bottom: "74.29%",
  },
  bigKnobDial: {
    position: "absolute",
    zIndex: 2,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderBottom: "14px solid white",
    left: "42.35%",
    right: "47.82%",
    top: "0%",
    bottom: "79.29%",
  },
  bigKnob: (rotationAngle) => {
    return {
      zIndex: 2,
      position: "absolute",
      left: "11.48%",
      right: "14.95%",
      top: "0.09%",
      bottom: "25.69%",
      borderRadius: "50%",
      background: "black",
      transform: `rotate(${rotationAngle}deg)`,
    };
  },
  littleKnob: (rotationAngle) => {
    return {
      zIndex: 2,
      position: "absolute",
      left: "22.31%",
      right: "33.06%",
      top: "0%",
      bottom: "37.54%",
      borderRadius: "50%",
      background: "black",
      transform: `rotate(${rotationAngle}deg)`,
    };
  },
  inputRange: (sliderData) => {
    let decimalVal = sliderData.opacity / 100;
    return {
      opacity: decimalVal,
      position: "relative",
      zIndex: 3,
      margin: `-${sliderData.placement}px auto 0 auto`,
      height: `80px`,
      transform: `rotate(${parseInt(sliderData.rotation)}deg)`,
    };
  },
  textLabel: {
    zIndex: 2,
    position: "relative",
    textAlign: "center",
    top: "80%",
    margin: "0px auto 0 -12px",
  },
};
