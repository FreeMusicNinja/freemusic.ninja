/* global require */

var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    ember,
    node,
    installs = [];

var NODE_PORT = 3900,
    EMBER_PORT = 4900;


gulp.task('node', function () {
  if (node) node.kill();  // Kill server if one is running
  process.env.PORT = NODE_PORT;
  node = spawn('node', ['server/index.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Node error detected, waiting for changes...');
    }
  });
});

gulp.task('ember', function () {
  process.env.API_URL = "http://localhost:" + NODE_PORT + "/";
  ember = spawn('./node_modules/.bin/ember', ['server', '--port=' + EMBER_PORT,], {cwd: 'ember', stdio: 'inherit'});
  ember.on('close', function (code) {
    if (code === 8) {
      console.log('Ember error detected, waiting for changes...');
    }
  });
});


gulp.task('install', function () {
  installs.push(spawn('npm', ['install'], {cwd: 'ember', stdio: 'inherit'}));
  installs.push(spawn('bower', ['install'], {cwd: 'ember', stdio: 'inherit'}));
  installs.push(spawn('npm', ['install'], {stdio: 'inherit'}));
});


gulp.task('default', function () {
  gulp.run('node');
  gulp.run('ember');

  // Reload node if files changed
  gulp.watch(['server/**/*.js'], function () {
    gulp.run('node');
  });
});


// kill node server on exit
process.on('exit', function() {
    if (node) node.kill();
    if (ember) ember.kill();
    installs.forEach(function (install) { install.kill(); });
});
