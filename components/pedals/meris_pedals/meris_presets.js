export default function MerisPresets(props){

	let presetVals = Array(17).fill().map((_, i) => i + 1)
	let groupedPresets = []
	var tempArr = []
	
	presetVals.map(x =>{
		if(((x-4)%4 == 1) || (x == Math.max(...presetVals))){
			groupedPresets.push(tempArr);
			tempArr = []
		}
		tempArr.push(x)
	})

	return (<div className="preset-groups-container">
      <div className={`preset-groups ${props.isActive()}`}>
        {groupedPresets.map((group) =>{
          return <div key={group}>{group.map((button => {
            return <button key={button} onClick={()=> props.programNumberSend(button)} >{button}</button>
          }))}</div>
        })}
      </div>
      <span onClick={()=> props.showOrHidePresets()}>{props.showOrHidePresetsLabel()}</span>
    </div>)

}

