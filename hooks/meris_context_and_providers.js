import {createContext} from 'react'
import useLocalStorage from './use_local_storage'
const defaultConfig = {
  opacity: 0,
  rotation: 0,
  placement: 0
}

const SliderStateContext = createContext(defaultConfig);

const SliderStateProvider = ({children, initialConfig= defaultConfig })=>{
	
	const [sliderState, setSliderState] = useLocalStorage('slider_data', defaultConfig);
	const updateSliderState = (key, value) => {
		let copiedConfig = {...sliderState}
		copiedConfig[key] = value
		setSliderState(copiedConfig)
	}
	
	return (
		<SliderStateContext.Provider value={{ sliderState, updateSliderState}}>
			{children}
		</SliderStateContext.Provider>
	)
}

module.exports = {
	SliderStateContext: SliderStateContext,
	SliderStateProvider: SliderStateProvider
}