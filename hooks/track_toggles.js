import { useEffect } from "react";

export default function trackToggles(props) {
  let { heelDispatch, toeDispatch } = props;
  // Insert code to keep track of

  // CC14 -> On Off => always on
  // CC9  -> Toggle
  // CC29 -> Toggle
  // CC30 -> Toggle
  // CC15 -> Tempo
  const channelstoWatch = [9, 29, 30, 15, 14];

  function heelDispatchOverride(action) {
    if (channelstoWatch.includes(action.key)) {
      if (action.key == 14) {
        toeDispatch({ ...action, value: 127 });
      } else {
        toeDispatch(action);
      }
    }
    return heelDispatch(action);
  }

  function toeDispatchOverride(action) {
    if (channelstoWatch.includes(action.key)) {
      if (action.key == 14) {
        heelDispatch({ ...action, value: 127 });
      } else {
        heelDispatch(action);
      }
    }
    return toeDispatch(action);
  }

  return [heelDispatchOverride, toeDispatchOverride];
}
