var Artist = require('mongoose').model('Artist'),
    echonest = require('../utils/echonest');

module.exports = function (app) {
  app.get('/similar', function(req, res) {
    var findFreeArtists = function (artistNames) {
      return Artist.find({name: {$in: artistNames}}).exec();
    };
    echonest.getSimilar(req.query.name)
      .then(function (names) {
        return findFreeArtists(names);
      })
      .then(function (artists) {
        res.json({'artists': artists});
      });
  });
};
