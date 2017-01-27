/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 80,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

	language: 'no',
	timeFormat: 24,
	units: 'metric',

	modules: [{
			module: 'alert',
		}, {
			module: "updatenotification",
			position: "top_bar"
		}, {
			module: 'clock',
			position: 'top_left'
		}, {
			module: 'compliments',
			position: 'bottom_bar'
		}, {
			module: 'currentweather',
			position: 'top_right',
			config: {
				location: 'Stavanger',
				locationID: '3137115',
				appid: '648212d459dde8390c2a03a5f617ad23'
			}
		}
		/*,{
		module: 'camera',
		position: 'lower_third',
		selfieInterval: 3, // Time interval in seconds before the photo will be taken.
		emailConfig: {
			service: 'Hotmail', // Email provider to use to send email with a photo.
			auth: {
				user: 'siljehetland@hotmail.com', // Your email account
				pass: '' // Your password for email account
			}
		}
	}*/
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {
	module.exports = config;
}
