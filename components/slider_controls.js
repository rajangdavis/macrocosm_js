export default function SliderControls(props){
	const sliderData = props.sliderData;
	const setSliderData = props.setSliderData;
	return(
    <details>
      <summary>
        CONTROL OPTIONS
      </summary>
  		<div className="slider-controls">
        <div>
          <label>Slider Opacity</label>
          <input type="range" 
                 min="0" 
                 max="100"
                 value={sliderData.opacity}
                 onChange={(e)=> setSliderData({...sliderData, opacity: e.target.value})}/>
        </div>
        <div>
          <label>Slider Rotation</label>
          <input type="range" 
                 min="0" 
                 max="359"
                 value={sliderData.rotation}
                 onChange={(e)=> setSliderData({...sliderData, rotation: e.target.value})}/>
        </div>
        <div>
          <label>Slider Placement</label>
          <input type="range" 
                 min="0" 
                 max="70"
                 value={sliderData.placement}
                 onChange={(e)=> setSliderData({...sliderData, placement: e.target.value})}/>
        </div>  
      </div>
    </details>
	)
}