const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });

};

const fetchCoordsByIP = function(ip, callback) {
  const address = 'https://ipvigilante.com/' + ip;
  request(address, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates.` 
      callback(Error(msg), null);
    } else {
      const latitude = JSON.parse(body).data.latitude;
      const longitude = JSON.parse(body).data.longitude;
      const data = { latitude, longitude };
      callback(null, data);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.latitude;
  const long = coords.longitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`,
  (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times.` 
      callback(Error(msg), null);
    } else {
      const timeDate = JSON.parse(body).response;
      callback(null, timeDate);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    
    } else { 
      fetchCoordsByIP(ip, (error, data) => {
        if (error) {
          callback(error, null);
          return;
        
        } else {
          fetchISSFlyOverTimes(data, (error, times) => {
            if (error) {
              callback(error, null);
              return;
            
            } else {
              callback(null, times)
            }
          })
        }
      })
    }
  });
}

module.exports = { nextISSTimesForMyLocation };