import NavButton from './nav_button'
import NavMenu from './nav_menu'
import {useState} from 'react'

export default function HeaderNav(props){
	const [headerOpen, setHeaderOpen] = useState(false);
  
  return (<div className="header-nav">
  	<nav>
  		<NavButton headerOpen={headerOpen} setHeaderOpen={setHeaderOpen}/>
      <NavMenu midiObject={props.midiObject}
               setMidiObject={props.setMidiObject}
               sliderData={props.sliderData}
               setSliderData={props.setSliderData}
               headerOpen={headerOpen}/>
  	</nav>
   </div>)
}
