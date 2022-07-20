import { NIL as NIL_UUID } from "uuid";
import cloneDeep from "lodash/cloneDeep";
import MerisEnzoPresets from "./meris_enzo_presets";
import MerisHedraPresets from "./meris_hedra_presets";
import MerisPolymoonPresets from "./meris_polymoon_presets";
import MerisMercury7Presets from "./meris_mercury_7_presets";
import MerisOttobitJrPresets from "./meris_ottobit_jr_presets";
import StrymonMobiusPresets from "./strymon_mobius_presets";

const addUid = (preset) => {
  let presetClone = cloneDeep(preset);
  presetClone.preset_id = NIL_UUID;
  return presetClone;
};

module.exports = {
  enzo: MerisEnzoPresets.map((x) => addUid(x)),
  hedra: MerisHedraPresets.map((x) => addUid(x)),
  polymoon: MerisPolymoonPresets.map((x) => addUid(x)),
  mercury7: MerisMercury7Presets.map((x) => addUid(x)),
  ottobitJr: MerisOttobitJrPresets.map((x) => addUid(x)),
  mobius: StrymonMobiusPresets.map((x) => addUid(x)),
};
