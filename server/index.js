/* global require */

require('./config/init')();

var config = require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var path = require('path');

require('./db');

var app = express();
var routes = globSync('./routes/**/*.js', { cwd: __dirname }).map(require);

app.listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes.forEach(function(route) { route(app); });
