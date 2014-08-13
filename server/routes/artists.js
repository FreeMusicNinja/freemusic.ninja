'use strict';

var Artist = require('mongoose').model('Artist');

module.exports = function (app) {
  app.get('/artists', function(req, res) {
    Artist.find({name: req.query.name}, function (err, artists) {
      // TODO Handle errors
      res.json({artists: artists});
    });
  });
};
