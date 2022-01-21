const request = require('request-promise-native');

const fetchMyIP = function() {

  return request('https://api.ipify.org?format=json');

};

const fetchCoordsByIP = function(body) {

  const ip = JSON.parse(body).ip;

  return request(`https://freegeoip.app/json/${ip}`);

};

const fetchISSFlyOverTimes = function(coords) {

  const {latitude, longitude} = JSON.parse(coords);

  const coord = {latitude, longitude};

  return request(`https://iss-pass.herokuapp.com/json/?lat=${coord.latitude}&lon=${coord.longitude}`);

};

const nextISSTimesForMyLocation = function() {

  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {

    const data = JSON.parse(body);

    console.log(data)
    return data.response;

  });

};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

