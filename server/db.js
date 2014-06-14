var mongoose = require('mongoose');
var globSync = require('glob').sync;
var models   = globSync('./models/*.js', { cwd: __dirname }).map(require);
var config   = require('../config/server.js');

mongoose.connect(config.db);
