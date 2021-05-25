export default function NavMenu(props){
	
	let className = props.headerOpen ? "nav-menu open" : "nav-menu closed"

  return (<div className={className}>
		MENU
   </div>)
}
