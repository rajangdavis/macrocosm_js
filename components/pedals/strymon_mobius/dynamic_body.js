import Chorus from "./chorus";
import Flanger from "./flanger";
import Rotary from "./rotary";
import Vibe from "./vibe";
import Phaser from "./phaser";
import Filter from "./filter";
import Formant from "./formant";
import VintageTrem from "./vintage_trem";
import PatternTrem from "./pattern_trem";
import Autoswell from "./autoswell";
import Destroyer from "./destroyer";
import Quadrature from "./quadrature";

export default function DynamicBody(props) {
  let { encoderType } = props;
  let bodyOptions = [
    <Chorus key={"Chorus"} {...props} />,
    <Flanger key={"Flanger"} {...props} />,
    <Rotary key={"Rotary"} {...props} />,
    <Vibe key={"Vibe"} {...props} />,
    <Phaser key={"Phaser"} {...props} />,
    <Filter key={"Filter"} {...props} />,
    <Formant key={"Formant"} {...props} />,
    <VintageTrem key={"VintageTrem"} {...props} />,
    <PatternTrem key={"PatternTrem"} {...props} />,
    <Autoswell key={"Autoswell"} {...props} />,
    <Destroyer key={"Destroyer"} {...props} />,
    <Quadrature key={"Quadrature"} {...props} />,
  ];
  return <>{bodyOptions.filter((_, i) => encoderType == i).map((x) => x)}</>;
}
