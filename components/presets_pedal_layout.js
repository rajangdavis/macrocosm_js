import MerisEnzoLayoutPresets from "./pedals/meris_enzo/layout_presets";
import MerisHedraLayoutPresets from "./pedals/meris_hedra/layout_presets";
import MerisPolymoonLayoutPresets from "./pedals/meris_polymoon/layout_presets";
import MerisMercury7LayoutPresets from "./pedals/meris_mercury7/layout_presets";
import MerisOttobitJrLayoutPresets from "./pedals/meris_ottobit_jr/layout_presets";

const LAYOUT_MAP = {
  enzo: MerisEnzoLayoutPresets,
  hedra: MerisHedraLayoutPresets,
  polymoon: MerisPolymoonLayoutPresets,
  mercury7: MerisMercury7LayoutPresets,
  ottobitJr: MerisOttobitJrLayoutPresets,
};

export default function PresetsPedalLayout(props) {
  let { selectedPedal } = props;
  return LAYOUT_MAP[selectedPedal](props);
}
