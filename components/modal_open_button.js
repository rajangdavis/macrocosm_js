import Link from 'next/link'
export default function ModalOpenButton(props){
  let text = "MAIN MENU";

  const engageFullScreen = (e)=>{
    let body = document.getElementsByTagName('html')
    if (body[0] && body[0].requestFullscreen) {
      body[0].requestFullscreen();
    }
  }

  const exitFullScreen = (e)=>{
    document.exitFullscreen()
  }
  return (
    <div className="presets-button-container">
      <Link href="/macros"><a>Macros</a></Link>
		  <button className="presets-button" onClick={()=>props.setPresetsOpen(!props.presetsOpen)}>{text}</button>
      <div className="fullscreen-button">
        <a className="fullscreen full" onClick={engageFullScreen}>Fullscreen</a>
        <a className="fullscreen normal" onClick={exitFullScreen}>Normal</a>
      </div>
    </div>
  )
}
