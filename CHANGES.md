# Changes

## State Representation

```
// To be updated
hooks/pedal_states.js
hooks/web_midi_state.js

// To be removed
hooks/manage_midi.js
hooks/sysex_knobs_update.js
hooks/meris_state.js
hooks/pedal_init.js
hooks/track_toggles.js
hooks/track_toggles_simple.js
```

These need to change:

1. Pedal states need to become sysex byte strings to represent state for pedals. This would allow for presets to be built from the main UI.

2. Web MIDI state can create be altered to use better primitives for tracking which inputs and outputs are available for use in the UI. This would allow the removal of the manage midi state hook.
	i. sysex_knobs_update hook would need to be adjusted to modify the sysex byte string when updates are made
	ii. the track toggles hooks can be removed

## Components

```
// To be updated
components/knob.js
components/preset_modal.js

// To be created
pop up presets menu -> save
pop up presets menu -> update the pedal settings
pop up to send PC commands

// To be removed
components/presets_builder.js
components/presets_builder_simple.js
components/presets_editor.js
components/presets_editor_simple.js
```

I want to remap the knobs to update the pedal state represented as a sysex byte string depending on where the expression is set except for the Strymon pedals.
