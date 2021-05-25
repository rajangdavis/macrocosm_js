import SliderControls from './slider_controls'
import MidiControls from './midi_controls'
import NavButton from './nav_button'
import NavMenu from './nav_menu'
import {useState} from 'react'
export default function HeaderNav(props){
	const [headerOpen, setHeaderOpen] = useState(false);
  
  return (<div className="header-nav">
  	<nav>
  		<NavButton headerOpen={headerOpen} setHeaderOpen={setHeaderOpen}/>
  		<NavMenu headerOpen={headerOpen}/>
  	</nav>
   </div>)
}
