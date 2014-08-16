/* jshint node: true */

module.exports = {
  protocol: 'http',
  port: process.env.PORT || 3000,
  echonest: {
    apiKey: process.env.ECHONEST_API_KEY,
  },
};
