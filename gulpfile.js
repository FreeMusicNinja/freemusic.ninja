/* global require */

var gulp = require('gulp'),
    spawn = require('child_process').spawn;


gulp.task('server', function() {
  spawn('node', ['node/server.js'], {stdio: 'inherit'});
});


gulp.task('default', function() {
  gulp.run('server');
});
