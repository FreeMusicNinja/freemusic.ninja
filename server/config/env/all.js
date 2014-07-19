/* jshint node: true */

module.exports = {
  port: process.env.PORT || 3000,
  echonest: {
    api_key: process.env.ECHONEST_API_KEY,
  },
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/musicfinder',
};
