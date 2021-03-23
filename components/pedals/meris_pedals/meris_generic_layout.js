import MerisPresets from './meris_presets'
import MerisGenericControls from './meris_generic_controls'
import MidiChannelSelect from '../../midi_channel_select'
import MidiDevicePortSelector from '../../midi_device_port_selector'
import MerisComputedFunctions from './meris_computed_functions'

export default function MerisGenericLayout(props){
  let cf = MerisComputedFunctions({...props.pedalData, dispatch: props.dispatch});
  let deviceOutput = props.midiObject.outputValues.filter(x => x.name == props.outputPort)[0]
  return (<div className={props.pedalData.className}>
            <a onClick={cf.removePedal} className='pedal-label'>Remove</a>
            <a onClick={() => cf.showControls()} className='pedal-label text-center'>{cf.showOrHidePedalLabel()}</a>
            <div className={`interface ${cf.pedalActive()}`} >
              <div className="channel-input">
                <MidiChannelSelect 
                className="midi-channel-input" 
                midiChannelChange={cf.midiChannelChange} 
                midiChannel={cf.currentMidiChannel()}/>
                <MerisPresets 
                  deviceOutput={deviceOutput} 
                  midiChannel={props.pedalData.midiChannel} 
                  isActive={cf.arePresetsActive} 
                  showOrHidePresets={cf.showOrHidePresets} 
                  showOrHidePresetsLabel={cf.showOrHidePresetsLabel} 
                  programNumberSend={cf.programNumberSend}/>
              </div>
              <div className={`${cf.inAltMode()}controls`}>
                <MerisGenericControls 
                  controlChange={cf.controlChange} 
                  direction={`${cf.inAltMode()}left`} 
                  pedalFunctions={props.pedalData.pedalFunctions} 
                  midiChannel={cf.currentMidiChannel()} 
                  deviceOutput={deviceOutput} changeAltState={cf.changeAltState}/>
                <MerisGenericControls 
                  controlChange={cf.controlChange} 
                  direction={`${cf.inAltMode()}center`} 
                  pedalFunctions={props.pedalData.pedalFunctions} 
                  midiChannel={cf.currentMidiChannel()} 
                  deviceOutput={deviceOutput}/>
                <MerisGenericControls 
                  controlChange={cf.controlChange} 
                  direction={`${cf.inAltMode()}right`} 
                  pedalFunctions={props.pedalData.pedalFunctions} 
                  midiChannel={cf.currentMidiChannel()} 
                  deviceOutput={deviceOutput}/>
              </div>
            </div>
          </div>)
}
