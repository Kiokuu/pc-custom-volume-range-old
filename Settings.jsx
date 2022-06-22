const { React } = require('powercord/webpack');
const { TextInput } = require('powercord/components/settings');

module.exports = class LargerVolumeRangeSettings extends React.Component {
  render() {
    const { getSetting, updateSetting } = this.props;
    return (
	<div>
      <TextInput
        note="Maximum adjustable volume on the volume slider"
        defaultValue={getSetting("maxAdjustableVolume", this.props.defaultMaxVolume)}
        onChange={(value) =>
          !isNaN(value) ? updateSetting("maxAdjustableVolume", Number(value)) : null
        }
      >
        Max Volume
      </TextInput>
	  <TextInput
        note="Maximum adjustable volume on the screenshare slider"
        defaultValue={getSetting("maxAdjustableScreenShareVolume", this.props.defaultMaxScreenShareVolume)}
        onChange={(value) =>
          !isNaN(value) ? updateSetting("maxAdjustableScreenShareVolume", Number(value)) : null
        }
      >
        Max Screenshare Volume
      </TextInput>
	</div>
	)
  }
};
