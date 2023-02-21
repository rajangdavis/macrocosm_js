# Macrocosm

A client-first app built with [React](https://reactjs.org/) and [Webmidi.js](https://webmidijs.org/) for controlling my pedalboard.

![My pedalboard](pedalboard.png)

The app is only supported by browsers that have support for the [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API)

## Supported features
1. Contains a UI for controlling all of the knobs, expression, and tempo for the following pedals:
	1. Meris Hedra
	2. Meris Enzo
	3. Mobius Strymon
	4. Meris Polymoon
	5. Meris Mercury7
	6. Meris Ottobit, Jr.
2. Can create presets for all of the Meris pedals mentioned above
3. Can create macros for setting presets for the above pedals including the Boss ES8 Switcher and Neural DSP Quad Cortex

## Primary Motivation and inspiration
1. I wanted to play with the Web MIDI API
2. I really liked the [editors](https://studiocode.dev/editors/) created by [François Georgy](https://francoisgeorgy.ch/) and wanted to create something similar
3. I wanted to have a modular pedalboard in that I can change the order of pedals, change the routing of devices, and have a flexible interface for doing so
4. I wanted the app to be client-first meaning no server/database is needed to run the app


## Future Goals
1. Create a way to change the presets via PC commands for the Strymon Mobius, Boss ES8, and Neural DSP Quad Cortex devices
2. Create a better design for mobile use; currently works well with a Samsung tablet and Macbook Pro
3. Create a way to share presets between apps, it might be possible via a custom sysex messaging API
4. Possibly reverse engineer the Boss ES8 Sysex messages and generate Boss ES8 presets based on macro data

## TODO
1. Basic instruction on what is needed to achieve connectivity via MIDI
2. Add some technical instruction on how certain features work (macro calls, knobs, state)
3. Possibly upgrade React, but not the hugest priority
