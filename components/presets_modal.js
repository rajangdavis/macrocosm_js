import NavButton from './nav_button'

export default function PresetsModal(props){
  return (
		<div className="presets-modal zoom-in">
      <div className="presets-modal-background">
			<NavButton 
				headerOpen={true} 
				setHeaderOpen={props.setPresetsOpen}
				/>
      </div>
      <div className="presets-modal-content">
        <label>PRESETS</label>
        <div>
          {props.presets.map((preset, i) =>{
            return <div key={i} className="preset-row">{preset.label}</div>
        	})}
        </div>
      </div>
    </div>
  )
}
