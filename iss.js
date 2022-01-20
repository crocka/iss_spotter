const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {

      callback(error, null);

      return;

    } else if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;

      callback(Error(msg), null);

      return;

    } else {

      const data = JSON.parse(body);

      callback(error, data.ip);

    }
  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {

      callback(error, null);

      return;

    } else if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;

      callback(Error(msg), null);

      return;

    } else {

      const data = JSON.parse(body);

      const {latitude, longitude} = data;

      const coord = {latitude, longitude};


      callback(error, coord);

    }


  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {

      callback(error, null);

      return;

    } else if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching fly-over-time. Response: ${body}`;

      callback(Error(msg), null);

      return;

    } else {

      const data = JSON.parse(body);

      const flyOverTime = data.response;

      callback(error, flyOverTime);

    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now

  fetchMyIP((error, ip) => {

    if (error) {
  
      console.log("It didn't work!", error);
  
      return;
  
    }
  
    console.log('It worked! Returned IP:', ip);
  
    fetchCoordsByIP(ip, (error, coord) => {
  
      if (error) {
    
        console.log("It didn't work!", error);
    
        return;
    
      }
    
      console.log('It worked! Returned coordinates:', coord);
    
      fetchISSFlyOverTimes(coord, (error, flyOverTime) => {
  
        if (error) {
      
          console.log("It didn't work!", error);
      
          return;
      
        }
      
        console.log('It worked! Returned fly-over-time:', flyOverTime);
    

        callback(error, flyOverTime);
      
      });
  
    });
  
  });
  


};

// fetchCoordsByIP('99.238.199.79');
// fetchISSFlyOverTimes({ latitude: 43.6859, longitude: -79.3974 });
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };