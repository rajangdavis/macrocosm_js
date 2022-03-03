export default function MerisGlobalSettings(
  pedalNumber,
  settingNumber,
  settingValue
) {
  return `f000 2010 0001 0${pedalNumber}2A ${settingNumber}${settingValue} F7`;
}
