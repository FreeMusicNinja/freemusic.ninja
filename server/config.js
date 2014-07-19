/* jshint node: true */

module.exports = {
  echonest: {
    api_key: process.env.ECHONEST_API_KEY,
  },
  db: process.env.MONGOHQ_URL || 'mongodb://localhost/musicfinder-dev',
};
