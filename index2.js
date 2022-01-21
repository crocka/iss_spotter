const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()

  .then(passTimes => passTimes.forEach(x => {

    const date = new Date(Date.now() + x.risetime);

    console.log(`Next pass at ${date} for ${x.duration} seconds!`);

  }))

  .catch((error) => {

    console.log("It didn't work: ", error.message);

  });