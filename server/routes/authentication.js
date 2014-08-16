'use strict';

var User = require('mongoose').model('User');
var validate = require('../validate');
var _ = require('lodash');

module.exports = function (app) {

  app.post('/users', function(req, res, next) {
    var body = _.cloneDeep(req.body);
    var errors = validate('User', body);
    if (errors) {
      return res.send(errors, 400);
    }
    var user = new User(body);
    user.save(function(err) {
      if (err) {
        return res.send(500, err.message);
      }
      res.send(200);
    });
  });

};
