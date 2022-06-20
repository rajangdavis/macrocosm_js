export default function ModalOpenButton(props) {
  let {
    pageState,
    setPageState,
    presetsOpen,
    setPresetsOpen,
    isConnected,
    isSupported,
  } = props;
  let text = "MAIN MENU";
  let linkText = pageState == "pedals" ? "Macros" : "Pedals";
  let showSwitchClass = isConnected ? "page-state" : "page-state invisible";
  let showFullScreenClass =
    isConnected && isSupported
      ? "fullscreen-button"
      : "fullscreen-button invisible";

  const engageFullScreen = () => {
    let body = document.getElementsByTagName("html");
    if (body[0] && body[0].requestFullscreen) {
      body[0].requestFullscreen();
    }
  };

  const changePageState = () => {
    let whereToGo = pageState == "pedals" ? "macros" : "pedals";
    setPageState(whereToGo);
  };

  const exitFullScreen = () => {
    document.exitFullscreen();
  };
  return (
    <div className="presets-button-container">
      <button className={showSwitchClass} onClick={changePageState}>
        {linkText}
      </button>
      <div className="main-menu-container">
        <button
          className="presets-button"
          onClick={() => setPresetsOpen(!presetsOpen)}
        >
          {text}
        </button>
        {!isConnected && <span className="red-dot"></span>}
      </div>
      <div className={showFullScreenClass}>
        <button className="fullscreen full" onClick={engageFullScreen}>
          Fullscreen
        </button>
        <button className="fullscreen normal" onClick={exitFullScreen}>
          Normal
        </button>
      </div>
    </div>
  );
}
