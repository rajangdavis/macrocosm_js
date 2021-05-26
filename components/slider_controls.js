import CustomSlider from './custom_slider'
export default function SliderControls(props){
	const sliderData = props.sliderData;
	const setSliderData = props.setSliderData;
	return(
		<div className="slider-controls">
			<CustomSlider
				label="Slider Opacity"
				min="0"
				max="100"
				value={sliderData.opacity}
				onChange={(e)=> setSliderData({...sliderData, opacity: e.target.value})}
			/>
			<CustomSlider
				label="Slider Rotation"
				min="0"
				max="359"
				value={sliderData.rotation}
				onChange={(e)=> setSliderData({...sliderData, rotation: e.target.value})}
			/>
			<CustomSlider
				label="Slider Placement"
				min="0"
				max="70"
				value={sliderData.placement}
				onChange={(e)=> setSliderData({...sliderData, placement: e.target.value})}
			/>
    </div>
	)
}