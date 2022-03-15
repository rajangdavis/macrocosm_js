export default function expressionSysex(data, expressionVal) {
  return data.map((_, i) => {
    if (i < 5) {
      return data[i];
    } else {
      let x = data[i];
      let y = data[i + 17];
      // Apply math except
      // for these channels
      // 21					CC14 - 127  // Bypass
      // 22					CC9 - 0     // Toggle
      // 23					CC29- 95    // 4-Way Switch
      // 24					CC30 - 127  // Toggle
      // 25					CC15 - 8    // Tempo, 0 - 120
      if (y == undefined) {
        return x;
      } else {
        return Math.floor(expressionVal * ((y - x) / 128)) + x;
      }
    }
  });
}
