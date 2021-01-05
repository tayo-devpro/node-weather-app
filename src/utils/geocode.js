const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidGF5b25ldHVzIiwiYSI6ImNramZscXoxazFwZWszMnNjZ3RmMmNmc28ifQ.Fyq5i-JvTmZs5l_eK153cQ";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (response.body.features.length == 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
