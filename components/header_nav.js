import NavButton from "./nav_button";
import NavMenu from "./nav_menu";
import { useState, useEffect } from "react";

export default function HeaderNav(props) {
  const [headerOpen, setHeaderOpen] = useState(false);

  const engageFullScreen = (e) => {
    let body = document.getElementsByTagName("html");
    if (body[0] && body[0].requestFullscreen) {
      body[0].requestFullscreen();
    }
  };

  const exitFullScreen = (e) => {
    document.exitFullscreen();
  };
  return (
    <div className="header-nav">
      <nav>
        <NavButton headerOpen={headerOpen} setHeaderOpen={setHeaderOpen} />
        {headerOpen && (
          <NavMenu
            midiObject={props.midiObject}
            setIsConnected={props.setIsConnected}
            setMidiObject={props.setMidiObject}
            sliderData={props.sliderData}
            setSliderData={props.setSliderData}
            headerOpen={headerOpen}
          />
        )}
      </nav>
    </div>
  );
}
