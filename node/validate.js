'use strict';

var env = require('jjv')();
var schemas = require('../common/schemas');

env.defaultOptions.removeDefault = true;

for (var name in schemas) {
  if (schemas.hasOwnProperty(name)) {
    env.addSchema(name, schemas[name]);
  }
}

module.exports = env.validate.bind(env);
