const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModuleByDisplayName, i18n: { Messages }, React } = require('powercord/webpack');

const Settings = require('./Settings');

const defaultMaxVolume = 400;
const defaultMaxScreenShareVolume = 300; // It seems 300 is the max volume for screenshare that still functions.
let pluginSettings;

module.exports = class CustomVolumeRange extends Plugin {
    startPlugin() {
        pluginSettings = this.settings;
        this.adjustVolumeSlider();
        powercord.api.settings.registerSettings('custom-volume-range-settings', {
            category: this.entityID,
            label: 'Custom Volume Range',
            render: props => React.createElement(Settings, {
                ...props,
                defaultMaxVolume
            })
        });
    }

    adjustVolumeSlider() {
        const Slider = getModuleByDisplayName('Slider', false);
        inject('custom-volume-range', Slider.prototype, 'render', function (args) {
            if (this.props) {
				var maxVolume = 200;
				// only change range if label is 'User volume' or 'Stream volume'
				if (this.props['aria-label']===Messages.USER_VOLUME){
					maxVolume = pluginSettings.get('maxAdjustableVolume', defaultMaxVolume);
				}
				else if (this.props['aria-label']===Messages.STREAM_VOLUME){
					maxVolume = pluginSettings.get('maxAdjustableScreenShareVolume', defaultMaxScreenShareVolume);
				}
				else{
					return;
				}
                this.props.maxValue = maxVolume;
                this.state.value = this.state.initialValueProp;
                this.state.max = maxVolume;
                this.state.range = this.state.max;
            }
            return args;
        }, true);
    }

    pluginWillUnload() {
        uninject('custom-volume-range');
        powercord.api.settings.unregisterSettings('custom-volume-range-settings');
    }
};
