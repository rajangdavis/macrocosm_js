import MerisEnzoLayout from "./pedals/meris_enzo/layout";
import MerisHedraLayout from "./pedals/meris_hedra/layout";
import MerisPolymoonLayout from "./pedals/meris_polymoon/layout";
import MerisMercury7Layout from "./pedals/meris_mercury7/layout";
import MerisOttobitJrLayout from "./pedals/meris_ottobit_jr/layout";
import StrymonMobiusLayout from "./pedals/strymon_mobius/layout";

const LAYOUT_MAP = {
  enzo: MerisEnzoLayout,
  hedra: MerisHedraLayout,
  polymoon: MerisPolymoonLayout,
  mercury7: MerisMercury7Layout,
  ottobitJr: MerisOttobitJrLayout,
  mobius: StrymonMobiusLayout,
};

export default function PedalLayouts(props) {
  let { selectedPedal } = props;
  return LAYOUT_MAP[selectedPedal](props);
}
