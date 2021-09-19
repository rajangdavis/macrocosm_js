export default function ModalOpenButton(props){
  let text = "MAIN MENU";
  return (
		<button className="presets-button" onClick={()=>props.setPresetsOpen(!props.presetsOpen)}>{text}</button>
  )
}
