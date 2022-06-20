import { createContext, useEffect, useState } from "react";
import { WebMidi } from "webmidi";

const defaultConfig = {
  outputs: [],
};

const WebMidiContext = createContext(defaultConfig);

const WebMidiProvider = ({ children, initialConfig = defaultConfig }) => {
  const [midiObject, setWebMidi] = useState(initialConfig);

  const updateWebMidi = async () => {
    return WebMidi.enable({ sysex: true })
      .then((access) => {
        if (access != undefined) setWebMidi(access);
      })
      .catch((err) => {
        alert("You must enable WebMIDI in order to use this application");
      });
  };

  useEffect(updateWebMidi, []);

  return (
    <WebMidiContext.Provider value={{ midiObject, updateWebMidi }}>
      {children}
    </WebMidiContext.Provider>
  );
};

module.exports = {
  WebMidiContext: WebMidiContext,
  WebMidiProvider: WebMidiProvider,
};
