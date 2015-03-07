/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp({
  fingerprint: {
    prepend: 'https://s3.amazonaws.com/assets.freemusic.ninja/',
  },
});
var extraAssets = [];

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// Bootstrap
app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');

// Glyphicons
extraAssets.push(pickFiles('bower_components/bootstrap-sass-official/assets', {
     srcDir: '/fonts',
     destDir: '/fonts'
 }));

if (app.env === 'test') {
  app.import('bower_components/jquery-mockjax/jquery.mockjax.js');
}

module.exports = mergeTrees([app.toTree()].concat(extraAssets));
