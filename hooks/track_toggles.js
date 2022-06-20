import { useEffect, useRef } from "react";

export default function trackToggles(props) {
  let { heelState, heelDispatch, toeState, toeDispatch } = props;
  let previousHeelState = useRef();
  let previousToeState = useRef();

  // useEffect(()=>{
  //  	previousHeelState = heelState;
  //  	previousToeState = toeState;
  //  }, [previousHeelState,heelState, previousToeState, toeState])

  // Insert code to keep track of

  // CC14 -> On Off => always on
  // CC9  -> Toggle
  // CC29 -> Toggle
  // CC30 -> Toggle
  // CC15 -> Tempo
  const channelstoWatch = [9, 29, 30, 15];

  useEffect(() => {
    if (heelState) {
      for (var i = channelstoWatch.length - 1; i >= 0; i--) {
        let value = heelState[channelstoWatch[i]];
        toeDispatch({ key: channelstoWatch[i], value: value, skipMidi: true });
      }
      toeDispatch({ key: 14, value: 127, skipMidi: true });
      heelDispatch({ key: 14, value: 127, skipMidi: true });
    }
  }, [heelState]);

  useEffect(() => {
    if (toeState) {
      for (var i = channelstoWatch.length - 1; i >= 0; i--) {
        let value = toeState[channelstoWatch[i]];
        heelDispatch({ key: channelstoWatch[i], value: value, skipMidi: true });
      }
      toeDispatch({ key: 14, value: 127, skipMidi: true });
      heelDispatch({ key: 14, value: 127, skipMidi: true });
    }
  }, [toeState]);
}
