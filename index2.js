/*const fetchMyIP = require('./iss_promised').fetchMyIP;
const fetchCoordsByIP = require('./iss_promised').fetchCoordsByIP;
const fetchISSFlyOverTimes = require('./iss_promised').fetchISSFlyOverTimes;

fetchMyIP()
.then((IP) => {
  return fetchCoordsByIP(IP)
})
.then((coordinates) => {
  return fetchISSFlyOverTimes(coordinates)
})
.then((result) => {
  console.log(result);
});*/
const nextISSTimesForMyLocation = require('./iss_promised').nextISSTimesForMyLocation

nextISSTimesForMyLocation()
.then((times) => {
  console.log(times);
})
.catch((error) => {
  console.log('It didn\'t work:', error.message);
});