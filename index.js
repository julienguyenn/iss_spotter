//const fetchMyIP = require('./iss').fetchMyIP;
//const fetchCoordsByIP = require('./iss').fetchCoordsByIP;
//const fetchISSFlyOverTimes = require('./iss').fetchISSFlyOverTimes;

/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});*/

/*fetchCoordsByIP("invalidIP", (error, data) => {
  console.log('This is the error:', error);
  console.log('This is the data', data);
})*/

/*fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
  if (error) {
    console.log('there is an error!', error);
  } else {
    console.log(data);
  }
})*/

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
