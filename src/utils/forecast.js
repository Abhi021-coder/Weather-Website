const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=e11e9986c0890ef58031265c7883852f&query=" +
		latitude +
		"," +
		longitude;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect weather service", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					" . It's currently " +
					body.current.temperature
			);
		}
	});
};

module.exports = forecast;
