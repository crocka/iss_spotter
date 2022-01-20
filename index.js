const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {

    return console.log("It didn't work!", error);

  }
  // success, print out the deets!

  passTimes.forEach(x => {

    const date = new Date(Date.now() + x.risetime);

    console.log(`Next pass at ${date} for ${x.duration} seconds!`);

  });

});