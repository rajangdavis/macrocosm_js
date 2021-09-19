export default function CloseButton(props){
	
	let openOrClose = ()=> {
		props.setHeaderOpen(false)
	}

  return (<div className="nav-button open" onClick={openOrClose}>
  	<div className="line first"></div>
  	<div className="line second"></div>
   </div>)
}
