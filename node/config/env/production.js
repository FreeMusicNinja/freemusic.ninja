/* jshint node: true */

module.exports = {
  host: 'freemusicninja.herokuapp.com',
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI
};
