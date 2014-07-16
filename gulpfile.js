/* global require */

var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    ember,
    node;


gulp.task('node', function () {
  if (node) node.kill();  // Kill server if one is running
  node = spawn('node', ['server.js'], {cwd: 'node', stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Node error detected, waiting for changes...');
    }
  });
});

gulp.task('ember', function () {
  ember = spawn('./node_modules/.bin/ember', ['server', '--port=4900', '--proxy=http://localhost:3900'], {cwd: 'ember', stdio: 'inherit'});
  ember.on('close', function (code) {
    if (code === 8) {
      console.log('Ember error detected, waiting for changes...');
    }
  });
});


gulp.task('default', function () {
  gulp.run('node');
  gulp.run('ember');

  // Reload node if files changed
  gulp.watch(['node/**/*.js'], function () {
    gulp.run('node');
  });
});


// kill node server on exit
process.on('exit', function() {
    if (node) node.kill();
    if (ember) ember.kill();
});
