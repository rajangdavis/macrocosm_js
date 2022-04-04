export default function MerisGlobalSettings(
  sysexNumber,
  settingNumber,
  settingValue
) {
  if(settingValue > 0){
    var settingVal = settingValue.toString(16).toUpperCase();
  }else{
    var settingVal = `0${settingValue}`;
  }
  return `f000 2010 0001 0${sysexNumber} 2A 0${settingNumber} ${settingVal} F7`;
}
