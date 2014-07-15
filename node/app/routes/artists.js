var Artist = require('mongoose').model('Artist');

module.exports = function (app) {
  app.get('/api/artists', function(req, res) {
    Artist.find({name: req.query.name}, function (err, artists) {
      // TODO Handle errors
      res.json({artists: artists});
    });
  });
};
