export default function computeSysex(
  heelState,
  toeState,
  sysexByte,
  presetNumber
) {
  // 9					CC16-Heel - 58,
  // 10					CC17-Heel - 90,
  // 11					CC18-Heel - 83,
  // 12					CC19-Heel - 81,
  // 13					CC20-Heel - 63,
  // 14					CC21-Heel - 0,
  // 15					CC22-Heel - 0,
  // 16					CC23-Heel - 0,
  // 17					CC24-Heel - 127,
  // 18					CC25-Heel - 0,
  // 19					CC26-Heel - 72,
  // 20					CC27-Heel - 0
  // 21					CC14 - 127  // Bypass
  // 22					CC9 - 0     // Toggle
  // 23					CC29- 95    // 4-Way Switch
  // 24					CC30 - 127  // Toggle
  // 25					CC15 - 8    // Tempo, 0 - 120
  // 26					CC16-Toe - 0
  // 27					CC17-Toe - 123
  // 28					CC18-Toe - 127
  // 29					CC19-Toe - 127
  // 30					CC20-Toe - 63
  // 31					CC21-Toe - 0
  // 32					CC22-Toe - 0
  // 33					CC23-Toe - 0
  // 34					CC24-Toe - 36
  // 35					CC25-Toe - 0
  // 36					CC26-Toe - 72
  // 37					CC27-Toe - 0
  let parsedHeelState = parseValuesToString(heelState);
  let parsedToeState = parseValuesToString(toeState);

  return templateString(
    parsedHeelState,
    parsedToeState,
    sysexByte,
    presetNumber
  );
}

let templateString = (heelState, toeState, sysexByte, presetNumber) => {
  return `f000 2010 0001 0${sysexByte}26 ${fillNumber(presetNumber)}${
    heelState[16]
  } ${heelState[17]}${heelState[18]} ${heelState[19]}${heelState[20]} ${
    heelState[21]
  }${heelState[22]}
		${heelState[23]}${heelState[24]} ${heelState[25]}${heelState[26]} ${
    heelState[27]
  }7f ${heelState[9]}${heelState[29]} ${heelState[30]}${heelState[15]} ${
    toeState[16]
  }${toeState[17]} ${toeState[18]}${toeState[19]} ${toeState[20]}${toeState[21]}
		${toeState[22]}${toeState[23]} ${toeState[24]}${toeState[25]} ${toeState[26]}${
    toeState[27]
  } f7`;
};

let parseValuesToString = (object) => {
  let copy = { ...object };
  Object.keys(copy).map((key) => {
    copy[key] = parseValue(object, key);
  });
  return copy;
};

let parseValue = (object, key) => {
  if (object[key] == null) {
    return "00";
  } else {
    let firstPass = object[key].toString(16);
    return fillNumber(firstPass);
  }
};

let fillNumber = (firstPass) => {
  if (firstPass.length == 1) {
    return `0${firstPass}`;
  } else {
    return firstPass;
  }
};
