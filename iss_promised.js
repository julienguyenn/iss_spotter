const request = require('request-promise-native');

const fetchMyIP = function() {
  let IP = request('https://api.ipify.org/?format=json');
  return IP;
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip
  let coordinates = request('https://ipvigilante.com/' + ip);
  return coordinates;

};

const fetchISSFlyOverTimes = function(body) {
  const coords = JSON.parse(body).data;
  const lat = coords.latitude;
  const long = coords.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((final) => {
    const times = JSON.parse(final).response;
    return times;
  })
}

module.exports = { nextISSTimesForMyLocation };