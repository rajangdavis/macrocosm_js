module.exports = {
  HandleMidiOutput: (action, props = {}) => {
    if (action.skipMidi && action.skipMidi == true) return;
    let { midiObject, midiData } = props;
    if (midiObject && midiData.output && midiData.channel) {
      let ccValue = action.key;
      let deviceOutput = midiObject.outputs.filter((x) => {
        return x.name == midiData.output;
      })[0];
      console.log(ccValue, action.value, { channels: midiData.channel });
      deviceOutput.sendControlChange(ccValue, action.value, {
        channels: parseInt(midiData.channel),
      });
    }
  },
};