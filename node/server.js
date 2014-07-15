/* global require */

var express = require('express');
var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var path = require('path');

require('./app/db');

var app = express();
var routes = globSync('./app/routes/**/*.js', { cwd: __dirname }).map(require);

app.listen(3900, function() {
  console.log('Listening on port 3900');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.resolve('./public')));

routes.forEach(function(route) { route(app); });
