const request = require("request");

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWJoaS1jb2RlcjAyMSIsImEiOiJja3I3cWZkcWszczV4MnFxYTB2MXgxODdyIn0.5lVIDqnXE2yapQ3l_lT7rQ&limit=1";

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect location services", undefined);
		} else if (body.features.length === 0) {
			callback("Can not find location Please fill another", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
