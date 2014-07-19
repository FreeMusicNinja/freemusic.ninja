/* jshint node: true */

module.exports = {
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI
};
