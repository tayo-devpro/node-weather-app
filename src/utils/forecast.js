const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c986403c93d1b42573b67f5c8d5d7721&query=" +
    latitude +
    "," +
    longitude;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service api", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        description: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        precipitation: response.body.current.precip + " % chance of rain",
      });
    }
  });
};

module.exports = forecast;
