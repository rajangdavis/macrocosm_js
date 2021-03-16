import MerisPresets from './meris_presets'
import MerisGenericControls from './meris_generic_controls'
import MidiChannelSelect from '../../midi_channel_select'
import MidiDevicePortSelector from '../../midi_device_port_selector'

export default function MerisGenericLayout(props, pedalData){
  let cf = pedalData.computedFunctions
  let deviceOutput = props.midiObject.outputValues.filter(x => x.name == pedalData.outputPort)[0]
  return (<div className={pedalData.className}>
            <a onClick={cf.showControls} className='pedal-label text-center'>{cf.showOrHidePedalLabel()}</a>
            <div className={`interface ${cf.pedalActive()}`} >
              <div className="channel-input">
                <MidiChannelSelect className="midi-channel-input" midiChannelChange={cf.midiChannelChange} midiChannel={cf.currentMidiChannel()}/>
                <MerisPresets deviceOutput={deviceOutput} midiChannel={props.midiChannel} isActive={cf.arePresetsActive} showOrHidePresets={cf.showOrHidePresets} showOrHidePresetsLabel={cf.showOrHidePresetsLabel} programNumberSend={cf.programNumberSend}/>
              </div>
              <div className={`${cf.inAltMode()}controls`}>
                <MerisGenericControls controlChange={cf.controlChange} direction={`${cf.inAltMode()}left`} pedalData={pedalData} midiChannel={cf.currentMidiChannel()} deviceOutput={deviceOutput} changeAltState={cf.changeAltState}/>
                <MerisGenericControls controlChange={cf.controlChange} direction={`${cf.inAltMode()}center`} pedalData={pedalData} midiChannel={cf.currentMidiChannel()} deviceOutput={deviceOutput}/>
                <MerisGenericControls controlChange={cf.controlChange} direction={`${cf.inAltMode()}right`} pedalData={pedalData} midiChannel={cf.currentMidiChannel()} deviceOutput={deviceOutput}/>
              </div>
            </div>
          </div>)
}
