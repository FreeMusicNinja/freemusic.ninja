var mongoose = require('mongoose');
var globSync = require('glob').sync;
var models   = globSync('./models/*.js', { cwd: __dirname }).map(require);

mongoose.connect('mongodb://localhost/musicfinder-dev');
