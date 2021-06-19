export default function GlobalSettingsRow(props){
  
  let selected = (stateVal, thisVal)=>{
    return stateVal == thisVal ? 'selected' : '';
  }

  return(
		<tr>
      <td className="title">{props.title}</td>
      <td 
        className={selected(props.state, props.option1)}
        onClick={()=> props.setState(props.option1)}
        >{props.option1}</td>
      <td 
        className={selected(props.state, props.option2)}
        onClick={()=> props.setState(props.option2)}
        >{props.option2}</td>
    </tr>
	)
}