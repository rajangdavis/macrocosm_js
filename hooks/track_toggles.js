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
  const channelstoWatch = [14, 9, 29, 30, 15];

  useEffect(() => {
    [14, 9, 29, 30, 15].map((x) => {});
  }, [heelState, heelDispatch, toeState, toeDispatch]);
}
