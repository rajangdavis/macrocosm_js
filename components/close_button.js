export default function CloseButton(props){
	
	let className = props.headerOpen ? "nav-button open" : "nav-button closed"
	let openOrClose = ()=> {
		props.setHeaderOpen(!props.headerOpen)	
	}

  return (<div className={className} onClick={openOrClose}>
  	<div className="line first"></div>
  	{!props.headerOpen && <div className="line"></div>}
  	<div className="line second"></div>
   </div>)
}
