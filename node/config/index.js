'use strict';

var _ = require('lodash');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

module.exports = (function () {
  var c = _.extend(
      require('./env/all'),
      require('./env/' + process.env.NODE_ENV) || {}
  );
  c.baseURL = c.protocol + '://' + c.host + ':' + c.port + '/';
  return c;
}());
