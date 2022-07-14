import Chorus from "./chorus";
import Flanger from "./flanger";
import Rotary from "./rotary";
import Vibe from "./vibe";
import Phaser from "./phaser";
import Filter from "./filter";

export default function DynamicBody(props) {
  let { encoderType } = props;
  let bodyOptions = [
    <Chorus key={"Chorus"} {...props} />,
    <Flanger key={"Flanger"} {...props} />,
    <Rotary key={"Rotary"} {...props} />,
    <Vibe key={"Vibe"} {...props} />,
    <Phaser key={"Phaser"} {...props} />,
    <Filter key={"Filter"} {...props} />,
  ];
  return <>{bodyOptions.filter((_, i) => encoderType == i).map((x) => x)}</>;
}
