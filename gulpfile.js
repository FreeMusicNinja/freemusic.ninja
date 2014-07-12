/* global require */

var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;


gulp.task('server', function () {
  if (node) node.kill();  // Kill server if one is running
  node = spawn('node', ['node/server.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
});


gulp.task('default', function () {
  gulp.run('server');

  // Reload server if files changed
  gulp.watch(['node/**/*.js'], function () {
    gulp.run('server');
  });
});


// kill node server on exit
process.on('exit', function() {
    if (node) node.kill();
});
