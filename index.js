const axios = require("axios");
const endpoint = "https://covid19-cdn.workpointnews.com/api/world.json";

module.exports = async countryCode => {
  try {
    const resp = await axios.get(endpoint);
    if (countryCode) {
      return resp.data.statistics.filter(
        ({ alpha2 }) => alpha2 === countryCode
      );
    }
    return resp.data.statistics;
  } catch (e) {
    throw e;
  }
};
