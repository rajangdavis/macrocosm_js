import cloneDeep from 'lodash/cloneDeep';
import { useImmerReducer } from "use-immer";

export default function ManageState(){

  let reducer = (state, action) =>{
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let createMacro = (state)=>{
      let initialState = {
        macro_id: Date.now(),
        name: `Macro #${state.length + 1}`,
        midi_devices: [],
        open: true,
        order: state.length,
        show_midi_devices: false
      }
      state.push(initialState)
    }

    let cloneMacro = (state, action)=>{
      let [index, macro] = readMacro(state, action)
      let clone = cloneDeep(macro);
      let newMacroId = Date.now();
      clone.macro_id = newMacroId;
      for (var i = clone.midi_devices.length - 1; i >= 0; i--) {
        let midiDevice = clone.midi_devices[i];
        midiDevice.macro_id = newMacroId;
        let newMidiDeviceId = new Date();
        midiDevice.midi_device_id = newMidiDeviceId;
        for (var j = midiDevice.pedals.length - 1; j >= 0; j--) {
          let pedal = midiDevice.pedals[j]
          pedal.macro_id = newMacroId;
          pedal.midi_device_id = newMidiDeviceId;
          pedal.pedal_id = new Date();
        }
      }
      state.push(clone);
    }

    // READ
    let readMacro = (state, action)=>{
      let macro = state.filter( x => x.macro_id == action.macro_id)[0]
      let index = state.findIndex( x => x.macro_id == action.macro_id)
      return [index, macro];
    }

    // UPDATE
    let updateMacro = (state, action)=>{
      let [index, macro] = readMacro(state, action)
      macro[action.field] = action.new_value;
      state.splice(index, 1 , macro);
    }

    // DESTROY
    let removeMacro = (state, action)=>{
      return state.filter( x => x.macro_id != action.macro_id)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////


 
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let createMidiDevice = (state, action)=>{
      let midiDeviceId = Date.now()
      let newMidiDevice = (state, action)=>{
        return {
          midi_device_id: midiDeviceId,
          macro_id: state.macro_id,
          name: `MIDI Device #${state.midi_devices.length + 1}`,
          component_label: action.component_label,
          input_port: "",
          output_port: "",
          midi_channel: 1,
          program_number: 1,
          pedals: [],
          open: true,
          show_pedals: false
        }
      }
      let [index, macro] = readMacro(state, action);
      action.field = 'midi_devices'
      action.new_value = macro.midi_devices.concat([newMidiDevice(macro, action)])
      return updateMacro(state, action)
    }
    
    // READ
    let readMidiDevice = (state, action)=>{
      let [macroIndex, macro] = readMacro(state, action)
      let midiDevice = macro.midi_devices.filter(x => x.midi_device_id == action.midi_device_id)[0]
      let midiIndex = macro.midi_devices.findIndex(x => x.midi_device_id == action.midi_device_id)
      return [midiIndex, midiDevice, macroIndex, macro];
    }

    // UPDATE
    let updateMidiDevice = (state, action)=>{
      let [midiIndex, midiDevice, macroIndex, macro] = readMidiDevice(state, action)
      midiDevice[action.field] = action.new_value;
      macro.midi_devices.splice(midiIndex, 1, midiDevice)
    }
    
    // DESTROY
    let removeMidiDevice = (state, action)=>{
      let [midiIndex, midiDevice, macroIndex, macro] = readMidiDevice(state, action)
      macro.midi_devices = macro.midi_devices.filter(x => x.midi_device_id != action.midi_device_id)
      state.splice(macroIndex, 1 , macro);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE
    let createPedal = (state, action)=>{
      let [midiIndex, midiDevice, macroIndex, macro] = readMidiDevice(state, action)
      action.field = 'pedals'
      action.new_value = midiDevice.pedals.concat([action.pedal])
      midiDevice[action.field] = action.new_value;
      macro.midi_devices.splice(midiIndex, 1, midiDevice)
    }
    
    // READ
    let readPedalIndex = (state, action)=>{
      let [midiIndex, midiDevice, macroIndex, macro] = readMidiDevice(state, action)
      let pedal = midiDevice.pedals.filter(x => x.pedal_id == action.pedal_id)[0]
      let pedalIndex = midiDevice.pedals.findIndex(x => x.pedal_id == action.pedal_id)
      return [pedalIndex, pedal, midiIndex, midiDevice, macroIndex, macro]
    }

    // UPDATE
    let updatePedal = (state, action)=>{
      let [pedalIndex, pedal, midiIndex, midiDevice, macroIndex, macro] = readPedalIndex(state, action)
      pedal[action.field] = action.new_value;
      midiDevice.pedals.splice(pedalIndex, 1, pedal)
      macro.midi_devices.splice(midiIndex, 1, midiDevice)
      state.splice(macroIndex, 1 , macro);
    }
    
    // DESTROY
    let removePedal = (state, action)=>{
      let [pedalIndex, pedal, midiIndex, midiDevice, macroIndex, macro] = readPedalIndex(state, action)
      midiDevice.pedals = midiDevice.pedals.filter(x => x.pedal_id != action.pedal_id)
      macro.midi_devices.splice(midiIndex, 1, midiDevice)
      state.splice(macroIndex, 1 , macro)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
    switch(action.type){
      case 'create-macro':
        return createMacro(state)
      case 'clone-macro':
        return cloneMacro(state, action)
      case 'update-macro':
        return updateMacro(state, action)
      case 'remove-macro':
        return removeMacro(state, action)
      case 'create-midi-device':
        return createMidiDevice(state, action)
      case 'update-midi-device':
        return updateMidiDevice(state, action)
      case 'remove-midi-device':
        return removeMidiDevice(state, action)
      case 'create-pedal':
        return createPedal(state, action)
      case 'update-pedal':
        return updatePedal(state, action)
      case 'remove-pedal':
        return removePedal(state, action)
      default:
        throw new Error();
    }
	}
	return useImmerReducer(reducer, [
  {
    "macro_id": 1616464847762,
    "name": "Macro #1",
    "midi_devices": [
      {
        "midi_device_id": 1616464849175,
        "macro_id": 1616464847762,
        "name": "MIDI Device #1",
        "component_label": "Meris MIDI IO",
        "input_port": "",
        "output_port": "MIDIFlex4 Port 3",
        "midi_channel": 1,
        "program_number": 1,
        "pedals": [
          {
            "pedal_id": 1616464850651,
            "macro_id": 1616464847762,
            "midi_device_id": 1616464849175,
            "active": false,
            "presets_active": false,
            "presets_val": 0,
            "alt_mode": false,
            "midi_channel": "1",
            "midi_preset": "1",
            "input_port": "",
            "output_port": "",
            "KEY": {
              "ccValue": 16,
              "value": 0
            },
            "MICRO_TUNE": {
              "ccValue": 17,
              "value": 0
            },
            "MIX": {
              "ccValue": 18,
              "value": 0
            },
            "PITCH_1": {
              "ccValue": 19,
              "value": 0
            },
            "PITCH_2": {
              "ccValue": 20,
              "value": 0
            },
            "PITCH_3": {
              "ccValue": 21,
              "value": 0
            },
            "DELAY_MODE": {
              "ccValue": 29,
              "value": 0
            },
            "BYPASS": {
              "ccValue": 14,
              "value": 0
            },
            "SCALE_TYPE": {
              "ccValue": 22,
              "value": 0
            },
            "PITCH_CORRECTION_AND_GLIDE": {
              "ccValue": 23,
              "value": 0
            },
            "FEEDBACK": {
              "ccValue": 24,
              "value": 0
            },
            "TIME_DIVISION_1": {
              "ccValue": 25,
              "value": 0
            },
            "TIME_DIVISION_2": {
              "ccValue": 26,
              "value": 0
            },
            "TIME_DIVISION_3": {
              "ccValue": 27,
              "value": 0
            },
            "PITCH_CONTROL_SMOOTHING": {
              "ccValue": 30,
              "value": 0
            },
            "TAP": {
              "ccValue": 28,
              "value": 0
            },
            "HALF_SPEED_ENABLE": {
              "ccValue": 9,
              "value": 0
            },
            "className": "meris-hedra",
            "label": "Meris Hedra",
            "pedalFunctions": {
              "KEY": {
                "ccValue": 16,
                "type": "knob",
                "label": "Key",
                "className": "left-top"
              },
              "MICRO_TUNE": {
                "ccValue": 17,
                "type": "knob",
                "label": "Micro Tune",
                "className": "center-top"
              },
              "MIX": {
                "ccValue": 18,
                "type": "knob",
                "label": "Mix",
                "className": "right-top"
              },
              "PITCH_1": {
                "ccValue": 19,
                "type": "knob",
                "label": "Pitch 1",
                "className": "left-middle"
              },
              "PITCH_2": {
                "ccValue": 20,
                "type": "knob",
                "label": "Pitch 2",
                "className": "center-middle"
              },
              "PITCH_3": {
                "ccValue": 21,
                "type": "knob",
                "label": "Pitch 3",
                "className": "right-middle"
              },
              "DELAY_MODE": {
                "ccValue": 29,
                "label": "Delay Mode",
                "type": "groupable_button",
                "className": "right-above-bypass",
                "values": [
                  {
                    "label": "Series + Pitch Feedback",
                    "value": 0
                  },
                  {
                    "label": "Series",
                    "value": 63
                  },
                  {
                    "label": "Dual + Cross Feedback",
                    "value": 95
                  },
                  {
                    "label": "Dual",
                    "value": 127
                  }
                ]
              },
              "BYPASS": {
                "ccValue": 14,
                "label": "Bypass",
                "type": "button",
                "toggleValues": [
                  0,
                  127
                ],
                "className": "right-bottom"
              },
              "SCALE_TYPE": {
                "ccValue": 22,
                "type": "knob",
                "label": "Scale Type",
                "className": "alt-left-top"
              },
              "PITCH_CORRECTION_AND_GLIDE": {
                "ccValue": 23,
                "type": "knob",
                "label": "Pitch Correction and Glide",
                "className": "alt-center-top"
              },
              "FEEDBACK": {
                "ccValue": 24,
                "type": "knob",
                "label": "Feedback",
                "className": "alt-right-top"
              },
              "TIME_DIVISION_1": {
                "ccValue": 25,
                "type": "knob",
                "label": "Time Division 1",
                "className": "alt-left-middle"
              },
              "TIME_DIVISION_2": {
                "ccValue": 26,
                "type": "knob",
                "label": "Time Division 2",
                "className": "alt-center-middle"
              },
              "TIME_DIVISION_3": {
                "ccValue": 27,
                "type": "knob",
                "label": "Time Division 3",
                "className": "alt-right-middle"
              },
              "DELAY_MODE_": {
                "ccValue": 29,
                "label": "Delay Mode",
                "type": "groupable_button",
                "className": "alt-right-above-bypass",
                "values": [
                  {
                    "label": "Series + Pitch Feedback",
                    "value": 0
                  },
                  {
                    "label": "Series",
                    "value": 63
                  },
                  {
                    "label": "Dual + Cross Feedback",
                    "value": 95
                  },
                  {
                    "label": "Dual",
                    "value": 127
                  }
                ]
              },
              "PITCH_CONTROL_SMOOTHING": {
                "ccValue": 30,
                "label": "Pitch Control Smoothing",
                "type": "groupable_button",
                "values": [
                  {
                    "label": "Smoothing On",
                    "value": 0
                  },
                  {
                    "label": "Smoothing Off",
                    "value": 127
                  }
                ],
                "className": "alt-right-bottom"
              },
              "ALT": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "left-above-tap"
              },
              "TAP": {
                "ccValue": 28,
                "label": "Tap",
                "type": "button",
                "value": 127,
                "className": "left-bottom"
              },
              "ALT_": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "alt-left-above-tap active"
              },
              "HALF_SPEED_ENABLE": {
                "ccValue": 9,
                "label": "Half Speed Enable",
                "type": "button",
                "toggleValues": [
                  63,
                  64
                ],
                "className": "alt-left-bottom"
              }
            }
          },
          {
            "pedal_id": 1616464855976,
            "macro_id": 1616464847762,
            "midi_device_id": 1616464849175,
            "active": false,
            "presets_active": false,
            "presets_val": 0,
            "alt_mode": false,
            "midi_channel": "2",
            "midi_preset": "1",
            "input_port": "",
            "output_port": "",
            "PITCH": {
              "ccValue": 16,
              "value": 0
            },
            "FILTER": {
              "ccValue": 17,
              "value": 0
            },
            "MIX": {
              "ccValue": 18,
              "value": 0
            },
            "SUSTAIN": {
              "ccValue": 19,
              "value": 0
            },
            "FILTER_ENVELOPE": {
              "ccValue": 20,
              "value": 0
            },
            "MODULATION": {
              "ccValue": 21,
              "value": 0
            },
            "SYNTH_MODE": {
              "ccValue": 29,
              "value": 0
            },
            "BYPASS": {
              "ccValue": 14,
              "value": 0
            },
            "PORTAMENTO": {
              "ccValue": 22,
              "value": 0
            },
            "FILTER_TYPE": {
              "ccValue": 23,
              "value": 0
            },
            "DELAY_LEVEL": {
              "ccValue": 24,
              "value": 0
            },
            "RING_MODULATION": {
              "ccValue": 25,
              "value": 0
            },
            "FILTER_BANDWIDTH": {
              "ccValue": 26,
              "value": 0
            },
            "DELAY_FEEDBACK": {
              "ccValue": 27,
              "value": 0
            },
            "SYNTH_WAVESHAPE": {
              "ccValue": 30,
              "value": 0
            },
            "TAP": {
              "ccValue": 28,
              "value": 0
            },
            "ENVELOPE_TYPE": {
              "ccValue": 9,
              "value": 0
            },
            "className": "meris-enzo",
            "label": "Meris Enzo",
            "pedalFunctions": {
              "PITCH": {
                "ccValue": 16,
                "type": "knob",
                "label": "Pitch",
                "className": "left-top"
              },
              "FILTER": {
                "ccValue": 17,
                "type": "knob",
                "label": "Filter",
                "className": "center-top"
              },
              "MIX": {
                "ccValue": 18,
                "type": "knob",
                "label": "Mix",
                "className": "right-top"
              },
              "SUSTAIN": {
                "ccValue": 19,
                "type": "knob",
                "label": "Sustain",
                "className": "left-middle"
              },
              "FILTER_ENVELOPE": {
                "ccValue": 20,
                "type": "knob",
                "label": "Filter Envelope",
                "className": "center-middle"
              },
              "MODULATION": {
                "ccValue": 21,
                "type": "knob",
                "label": "Modulation",
                "className": "right-middle"
              },
              "SYNTH_MODE": {
                "ccValue": 29,
                "label": "Synth Mode",
                "type": "groupable_button",
                "className": "right-above-bypass",
                "values": [
                  {
                    "label": "Dry",
                    "value": 0
                  },
                  {
                    "label": "Mono",
                    "value": 63
                  },
                  {
                    "label": "Arp",
                    "value": 95
                  },
                  {
                    "label": "Poly",
                    "value": 127
                  }
                ]
              },
              "BYPASS": {
                "ccValue": 14,
                "label": "Bypass",
                "type": "button",
                "className": "right-bottom",
                "toggleValues": [
                  0,
                  127
                ]
              },
              "PORTAMENTO": {
                "ccValue": 22,
                "type": "knob",
                "label": "Portamento",
                "className": "alt-left-top"
              },
              "FILTER_TYPE": {
                "ccValue": 23,
                "type": "knob",
                "label": "Filter Type",
                "className": "alt-center-top"
              },
              "DELAY_LEVEL": {
                "ccValue": 24,
                "type": "knob",
                "label": "Delay Level",
                "className": "alt-right-top"
              },
              "RING_MODULATION": {
                "ccValue": 25,
                "type": "knob",
                "label": "Ring Modulation",
                "className": "alt-left-middle"
              },
              "FILTER_BANDWIDTH": {
                "ccValue": 26,
                "type": "knob",
                "label": "Filter Bandwidth",
                "className": "alt-center-middle"
              },
              "DELAY_FEEDBACK": {
                "ccValue": 27,
                "type": "knob",
                "label": "Delay Feedback",
                "className": "alt-right-middle"
              },
              "SYNTH_MODE_": {
                "ccValue": 29,
                "label": "Synth Mode",
                "type": "groupable_button",
                "className": "alt-right-above-bypass",
                "values": [
                  {
                    "label": "Dry",
                    "value": 0
                  },
                  {
                    "label": "Mono",
                    "value": 63
                  },
                  {
                    "label": "Arp",
                    "value": 95
                  },
                  {
                    "label": "Poly",
                    "value": 127
                  }
                ]
              },
              "SYNTH_WAVESHAPE": {
                "ccValue": 30,
                "label": "Synth Waveshape",
                "type": "groupable_button",
                "values": [
                  {
                    "label": "Sawtooth",
                    "value": 0
                  },
                  {
                    "label": "Square",
                    "value": 127
                  }
                ],
                "className": "alt-right-bottom"
              },
              "ALT": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "left-above-tap"
              },
              "TAP": {
                "ccValue": 28,
                "label": "Tap",
                "type": "button",
                "value": 127,
                "className": "left-bottom"
              },
              "ALT_": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "alt-left-above-tap active"
              },
              "ENVELOPE_TYPE": {
                "ccValue": 9,
                "label": "Envelope Type",
                "type": "button",
                "toggleValues": [
                  63,
                  64
                ],
                "className": "alt-left-bottom"
              }
            }
          }
        ],
        "open": true,
        "show_pedals": false
      }
    ],
    "open": true,
    "order": 0,
    "show_midi_devices": false
  },
  {
    "macro_id": 1616464872083,
    "name": "Macro #1",
    "midi_devices": [
      {
        "midi_device_id": "2021-03-23T02:01:12.083Z",
        "macro_id": 1616464872083,
        "name": "MIDI Device #1",
        "component_label": "Meris MIDI IO",
        "input_port": "",
        "output_port": "MIDIFlex4 Port 3",
        "midi_channel": 1,
        "program_number": 1,
        "pedals": [
          {
            "pedal_id": "2021-03-23T02:01:12.083Z",
            "macro_id": 1616464872083,
            "midi_device_id": "2021-03-23T02:01:12.083Z",
            "active": false,
            "presets_active": false,
            "presets_val": 0,
            "alt_mode": false,
            "midi_channel": "1",
            "midi_preset": "1",
            "input_port": "",
            "output_port": "",
            "KEY": {
              "ccValue": 16,
              "value": 0
            },
            "MICRO_TUNE": {
              "ccValue": 17,
              "value": 0
            },
            "MIX": {
              "ccValue": 18,
              "value": 0
            },
            "PITCH_1": {
              "ccValue": 19,
              "value": 0
            },
            "PITCH_2": {
              "ccValue": 20,
              "value": 0
            },
            "PITCH_3": {
              "ccValue": 21,
              "value": 0
            },
            "DELAY_MODE": {
              "ccValue": 29,
              "value": 0
            },
            "BYPASS": {
              "ccValue": 14,
              "value": 0
            },
            "SCALE_TYPE": {
              "ccValue": 22,
              "value": 0
            },
            "PITCH_CORRECTION_AND_GLIDE": {
              "ccValue": 23,
              "value": 0
            },
            "FEEDBACK": {
              "ccValue": 24,
              "value": 0
            },
            "TIME_DIVISION_1": {
              "ccValue": 25,
              "value": 0
            },
            "TIME_DIVISION_2": {
              "ccValue": 26,
              "value": 0
            },
            "TIME_DIVISION_3": {
              "ccValue": 27,
              "value": 0
            },
            "PITCH_CONTROL_SMOOTHING": {
              "ccValue": 30,
              "value": 0
            },
            "TAP": {
              "ccValue": 28,
              "value": 0
            },
            "HALF_SPEED_ENABLE": {
              "ccValue": 9,
              "value": 0
            },
            "className": "meris-hedra",
            "label": "Meris Hedra",
            "pedalFunctions": {
              "KEY": {
                "ccValue": 16,
                "type": "knob",
                "label": "Key",
                "className": "left-top"
              },
              "MICRO_TUNE": {
                "ccValue": 17,
                "type": "knob",
                "label": "Micro Tune",
                "className": "center-top"
              },
              "MIX": {
                "ccValue": 18,
                "type": "knob",
                "label": "Mix",
                "className": "right-top"
              },
              "PITCH_1": {
                "ccValue": 19,
                "type": "knob",
                "label": "Pitch 1",
                "className": "left-middle"
              },
              "PITCH_2": {
                "ccValue": 20,
                "type": "knob",
                "label": "Pitch 2",
                "className": "center-middle"
              },
              "PITCH_3": {
                "ccValue": 21,
                "type": "knob",
                "label": "Pitch 3",
                "className": "right-middle"
              },
              "DELAY_MODE": {
                "ccValue": 29,
                "label": "Delay Mode",
                "type": "groupable_button",
                "className": "right-above-bypass",
                "values": [
                  {
                    "label": "Series + Pitch Feedback",
                    "value": 0
                  },
                  {
                    "label": "Series",
                    "value": 63
                  },
                  {
                    "label": "Dual + Cross Feedback",
                    "value": 95
                  },
                  {
                    "label": "Dual",
                    "value": 127
                  }
                ]
              },
              "BYPASS": {
                "ccValue": 14,
                "label": "Bypass",
                "type": "button",
                "toggleValues": [
                  0,
                  127
                ],
                "className": "right-bottom"
              },
              "SCALE_TYPE": {
                "ccValue": 22,
                "type": "knob",
                "label": "Scale Type",
                "className": "alt-left-top"
              },
              "PITCH_CORRECTION_AND_GLIDE": {
                "ccValue": 23,
                "type": "knob",
                "label": "Pitch Correction and Glide",
                "className": "alt-center-top"
              },
              "FEEDBACK": {
                "ccValue": 24,
                "type": "knob",
                "label": "Feedback",
                "className": "alt-right-top"
              },
              "TIME_DIVISION_1": {
                "ccValue": 25,
                "type": "knob",
                "label": "Time Division 1",
                "className": "alt-left-middle"
              },
              "TIME_DIVISION_2": {
                "ccValue": 26,
                "type": "knob",
                "label": "Time Division 2",
                "className": "alt-center-middle"
              },
              "TIME_DIVISION_3": {
                "ccValue": 27,
                "type": "knob",
                "label": "Time Division 3",
                "className": "alt-right-middle"
              },
              "DELAY_MODE_": {
                "ccValue": 29,
                "label": "Delay Mode",
                "type": "groupable_button",
                "className": "alt-right-above-bypass",
                "values": [
                  {
                    "label": "Series + Pitch Feedback",
                    "value": 0
                  },
                  {
                    "label": "Series",
                    "value": 63
                  },
                  {
                    "label": "Dual + Cross Feedback",
                    "value": 95
                  },
                  {
                    "label": "Dual",
                    "value": 127
                  }
                ]
              },
              "PITCH_CONTROL_SMOOTHING": {
                "ccValue": 30,
                "label": "Pitch Control Smoothing",
                "type": "groupable_button",
                "values": [
                  {
                    "label": "Smoothing On",
                    "value": 0
                  },
                  {
                    "label": "Smoothing Off",
                    "value": 127
                  }
                ],
                "className": "alt-right-bottom"
              },
              "ALT": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "left-above-tap"
              },
              "TAP": {
                "ccValue": 28,
                "label": "Tap",
                "type": "button",
                "value": 127,
                "className": "left-bottom"
              },
              "ALT_": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "alt-left-above-tap active"
              },
              "HALF_SPEED_ENABLE": {
                "ccValue": 9,
                "label": "Half Speed Enable",
                "type": "button",
                "toggleValues": [
                  63,
                  64
                ],
                "className": "alt-left-bottom"
              }
            }
          },
          {
            "pedal_id": "2021-03-23T02:01:12.083Z",
            "macro_id": 1616464872083,
            "midi_device_id": "2021-03-23T02:01:12.083Z",
            "active": false,
            "presets_active": false,
            "presets_val": 0,
            "alt_mode": false,
            "midi_channel": "2",
            "midi_preset": "1",
            "input_port": "",
            "output_port": "",
            "PITCH": {
              "ccValue": 16,
              "value": 0
            },
            "FILTER": {
              "ccValue": 17,
              "value": 0
            },
            "MIX": {
              "ccValue": 18,
              "value": 0
            },
            "SUSTAIN": {
              "ccValue": 19,
              "value": 0
            },
            "FILTER_ENVELOPE": {
              "ccValue": 20,
              "value": 0
            },
            "MODULATION": {
              "ccValue": 21,
              "value": 0
            },
            "SYNTH_MODE": {
              "ccValue": 29,
              "value": 0
            },
            "BYPASS": {
              "ccValue": 14,
              "value": 0
            },
            "PORTAMENTO": {
              "ccValue": 22,
              "value": 0
            },
            "FILTER_TYPE": {
              "ccValue": 23,
              "value": 0
            },
            "DELAY_LEVEL": {
              "ccValue": 24,
              "value": 0
            },
            "RING_MODULATION": {
              "ccValue": 25,
              "value": 0
            },
            "FILTER_BANDWIDTH": {
              "ccValue": 26,
              "value": 0
            },
            "DELAY_FEEDBACK": {
              "ccValue": 27,
              "value": 0
            },
            "SYNTH_WAVESHAPE": {
              "ccValue": 30,
              "value": 0
            },
            "TAP": {
              "ccValue": 28,
              "value": 0
            },
            "ENVELOPE_TYPE": {
              "ccValue": 9,
              "value": 0
            },
            "className": "meris-enzo",
            "label": "Meris Enzo",
            "pedalFunctions": {
              "PITCH": {
                "ccValue": 16,
                "type": "knob",
                "label": "Pitch",
                "className": "left-top"
              },
              "FILTER": {
                "ccValue": 17,
                "type": "knob",
                "label": "Filter",
                "className": "center-top"
              },
              "MIX": {
                "ccValue": 18,
                "type": "knob",
                "label": "Mix",
                "className": "right-top"
              },
              "SUSTAIN": {
                "ccValue": 19,
                "type": "knob",
                "label": "Sustain",
                "className": "left-middle"
              },
              "FILTER_ENVELOPE": {
                "ccValue": 20,
                "type": "knob",
                "label": "Filter Envelope",
                "className": "center-middle"
              },
              "MODULATION": {
                "ccValue": 21,
                "type": "knob",
                "label": "Modulation",
                "className": "right-middle"
              },
              "SYNTH_MODE": {
                "ccValue": 29,
                "label": "Synth Mode",
                "type": "groupable_button",
                "className": "right-above-bypass",
                "values": [
                  {
                    "label": "Dry",
                    "value": 0
                  },
                  {
                    "label": "Mono",
                    "value": 63
                  },
                  {
                    "label": "Arp",
                    "value": 95
                  },
                  {
                    "label": "Poly",
                    "value": 127
                  }
                ]
              },
              "BYPASS": {
                "ccValue": 14,
                "label": "Bypass",
                "type": "button",
                "className": "right-bottom",
                "toggleValues": [
                  0,
                  127
                ]
              },
              "PORTAMENTO": {
                "ccValue": 22,
                "type": "knob",
                "label": "Portamento",
                "className": "alt-left-top"
              },
              "FILTER_TYPE": {
                "ccValue": 23,
                "type": "knob",
                "label": "Filter Type",
                "className": "alt-center-top"
              },
              "DELAY_LEVEL": {
                "ccValue": 24,
                "type": "knob",
                "label": "Delay Level",
                "className": "alt-right-top"
              },
              "RING_MODULATION": {
                "ccValue": 25,
                "type": "knob",
                "label": "Ring Modulation",
                "className": "alt-left-middle"
              },
              "FILTER_BANDWIDTH": {
                "ccValue": 26,
                "type": "knob",
                "label": "Filter Bandwidth",
                "className": "alt-center-middle"
              },
              "DELAY_FEEDBACK": {
                "ccValue": 27,
                "type": "knob",
                "label": "Delay Feedback",
                "className": "alt-right-middle"
              },
              "SYNTH_MODE_": {
                "ccValue": 29,
                "label": "Synth Mode",
                "type": "groupable_button",
                "className": "alt-right-above-bypass",
                "values": [
                  {
                    "label": "Dry",
                    "value": 0
                  },
                  {
                    "label": "Mono",
                    "value": 63
                  },
                  {
                    "label": "Arp",
                    "value": 95
                  },
                  {
                    "label": "Poly",
                    "value": 127
                  }
                ]
              },
              "SYNTH_WAVESHAPE": {
                "ccValue": 30,
                "label": "Synth Waveshape",
                "type": "groupable_button",
                "values": [
                  {
                    "label": "Sawtooth",
                    "value": 0
                  },
                  {
                    "label": "Square",
                    "value": 127
                  }
                ],
                "className": "alt-right-bottom"
              },
              "ALT": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "left-above-tap"
              },
              "TAP": {
                "ccValue": 28,
                "label": "Tap",
                "type": "button",
                "value": 127,
                "className": "left-bottom"
              },
              "ALT_": {
                "label": "Alt",
                "type": "button",
                "alt": true,
                "className": "alt-left-above-tap active"
              },
              "ENVELOPE_TYPE": {
                "ccValue": 9,
                "label": "Envelope Type",
                "type": "button",
                "toggleValues": [
                  63,
                  64
                ],
                "className": "alt-left-bottom"
              }
            }
          }
        ],
        "open": true,
        "show_pedals": false
      }
    ],
    "open": true,
    "order": 0,
    "show_midi_devices": false
  }
])
}
