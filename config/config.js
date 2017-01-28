/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
var _emotion = null;
var config = {
	port: 9999,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

	language: 'no',
	timeFormat: 24,
	units: 'metric',

	modules: [{
			module: 'alert',
			config: {
				getEmotion: function() {

					return _emotion;
				}
			}
		},
		/* {
				module: 'MMM-Swipe',
				position: 'bottom_right', // Doesn't matter after it's setup.  It should be blank.
				// Best results in one of the side regions like: bottom_left
				config: {
					// See 'Configuration options' for more information.
					echoLeftPin: 24, //Left Sensor's BCM Numbered Echo pin - REQUIRED
					triggerLeftPin: 23, //Left Sensor's BCM Numbered trigger pin - REQUIRED
					echoRightPin: 26, //Right Sensor's BCM Numbered Echo pin - REQUIRED
					triggerRightPin: 25, //Right Sensor's BCM Numbered trigger pin - REQUIRED
					useAsButton: false, //Enable a GPIO output when you "press".
					buttonPin: 8,
					verbose: false,
					calibrate: false
				}
			},*/
		{
			module: "updatenotification",
			position: "top_bar",
			config: {
				getEmotion: function() {

					return _emotion;
				}
			}
		}, {
			module: 'clock',
			position: 'top_left',
			config: {
				getEmotion: function() {

					return _emotion;
				}
			}
		}, {
			module: 'hello',
			position: 'bottom_left',
			config: {
				getEmotion: function() {

					return _emotion;
				}
			}
		}, {
			module: 'helloworld',
			position: 'bottom_right',
			config: {
				getEmotion: function() {

					return _emotion;
				}
			}
		}, {
			module: 'compliments',
			position: 'center',
			config: {
				getEmotion: function() {

					return _emotion;
				}
			}
		}, {
			module: 'currentweather',
			position: 'top_right',
			config: {
				location: 'Stavanger',
				locationID: '3137115',
				appid: '648212d459dde8390c2a03a5f617ad23',
				getEmotion: function() {
					return _emotion;
				},
				updateInterval: 5000
			}
		}, {
			module: 'emo_camera',
			position: 'lower_third',
			selfieInterval: 3, // Time interval in seconds before the photo will be taken.
			config: {
				setEmotion: function(emotion) {
					_emotion = emotion;
				}
			},
			emailConfig: {
				service: 'Hotmail', // Email provider to use to send email with a photo.
				auth: {
					user: 'siljehetland@hotmail.com', // Your email account
					pass: '' // Your password for email account
				}
			}
		}
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {
	module.exports = config;
}
