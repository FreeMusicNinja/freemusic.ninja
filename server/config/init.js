'use strict';

module.exports = function () {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }
};
