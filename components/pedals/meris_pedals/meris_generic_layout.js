import MerisPresets from './meris_presets'
import MerisGenericControls from './meris_generic_controls'
import MidiChannelSelect from '../../midi_channel_select'
import MerisComputedFunctions from './meris_computed_functions'

export default function MerisGenericLayout(props){
  let deviceOutput = props.midiObject.outputValues.filter(x => x.name == props.outputPort)[0]
  let cf = MerisComputedFunctions({...props.pedalData, dispatch: props.dispatch, midiObject: props.midiObject, deviceOutput: deviceOutput});
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
                  {...props.pedalData}
                  deviceOutput={deviceOutput}
                  dispatch={props.dispatch}
                  isActive={cf.arePresetsActive}
                  showOrHidePresets={cf.showOrHidePresets}
                  showOrHidePresetsLabel={cf.showOrHidePresetsLabel}
                  programNumberSend={cf.programNumberSend}/>
              </div>
              <div className={`${cf.normalKnobsClassName()} controls`}>
                <MerisGenericControls
                  controlChange={cf.controlChange}
                  direction={`left`}
                  pedalData={props.pedalData}
                  midiChannel={cf.currentMidiChannel()}
                  deviceOutput={deviceOutput} changeAltState={cf.changeAltState}/>
                <MerisGenericControls
                  controlChange={cf.controlChange}
                  direction={`center`}
                  pedalData={props.pedalData}
                  midiChannel={cf.currentMidiChannel()}
                  deviceOutput={deviceOutput}/>
                <MerisGenericControls
                  controlChange={cf.controlChange}
                  direction={`right`}
                  pedalData={props.pedalData}
                  midiChannel={cf.currentMidiChannel()}
                  deviceOutput={deviceOutput}/>
              </div>
              <div className={`${cf.altKnobsClassName()} alt-controls`}>
                <MerisGenericControls
                  controlChange={cf.controlChange}
                  direction={`alt-left`}
                  pedalData={props.pedalData}
                  midiChannel={cf.currentMidiChannel()}
                  deviceOutput={deviceOutput} changeAltState={cf.changeAltState}/>
                <MerisGenericControls
                  controlChange={cf.controlChange}
                  direction={`alt-center`}
                  pedalData={props.pedalData}
                  midiChannel={cf.currentMidiChannel()}
                  deviceOutput={deviceOutput}/>
                <MerisGenericControls
                  controlChange={cf.controlChange}
                  direction={`alt-right`}
                  pedalData={props.pedalData}
                  midiChannel={cf.currentMidiChannel()}
                  deviceOutput={deviceOutput}/>
              </div>
            </div>
            <h1>{props.pedalData.can_listen.toString()}</h1>
          </div>)
}
