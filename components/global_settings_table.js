export default function GlobalSettingsTable(props){
	return(
		<div className="settings-container">
      <table>
        <tbody>
          <tr>
            <td className="title">INPUT MODE</td>
            <td>Stereo</td>
            <td>Mono</td>
          </tr>
          <tr>
            <td className="title">LINE/SYNTH LEVEL</td>
            <td>Line</td>
            <td>Instrument</td>
          </tr>
          <tr>
            <td className="title">BYPASS MODE</td>
            <td>Relay</td>
            <td>Buffered</td>
          </tr>
          <tr>
            <td className="title">KILL DRY</td>
            <td>Muted</td>
            <td>Active</td>
          </tr>
          <tr>
            <td className="title">TRAILS</td>
            <td>On</td>
            <td>Off</td>
          </tr>
          <tr>
            <td className="title">GLOBAL TEMPO</td>
            <td>Preset</td>
            <td>Global</td>
          </tr>
        </tbody>
      </table>
    </div>
	)
}