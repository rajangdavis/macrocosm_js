import Link from "next/link";
export default function ModalOpenButton(props) {
  let { pageState, setPageState, presetsOpen, setPresetsOpen } = props;
  let text = "MAIN MENU";
  let linkText = pageState == "pedals" ? "Macros" : "Pedals";

  const engageFullScreen = (e) => {
    let body = document.getElementsByTagName("html");
    if (body[0] && body[0].requestFullscreen) {
      body[0].requestFullscreen();
    }
  };

  const changePageState = () => {
    let whereToGo = pageState == "pedals" ? "macros" : "pedals";
    setPageState(whereToGo);
  };

  const exitFullScreen = (e) => {
    document.exitFullscreen();
  };
  return (
    <div className="presets-button-container">
      <a className="page-state" onClick={changePageState}>
        {linkText}
      </a>
      <button
        className="presets-button"
        onClick={() => setPresetsOpen(!presetsOpen)}
      >
        {text}
      </button>
      <div className="fullscreen-button">
        <a className="fullscreen full" onClick={engageFullScreen}>
          Fullscreen
        </a>
        <a className="fullscreen normal" onClick={exitFullScreen}>
          Normal
        </a>
      </div>
    </div>
  );
}
