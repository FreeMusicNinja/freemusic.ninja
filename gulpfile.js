/* global require */

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var ember, django, mocha;
var installs = [];

var DJANGO_PORT = 3900,
    EMBER_PORT = 4900;


gulp.task('django', function () {
  if (django) django.kill();  // Kill server if one is running
  django = spawn('./django/manage.py', ['runserver', DJANGO_PORT], {stdio: 'inherit'});
  django.on('close', function (code) {
    if (code === 8) {
      console.log('Django error detected, waiting for changes...');
    }
  });
});

gulp.task('ember', function () {
  process.env.API_URL = "http://localhost:" + DJANGO_PORT + "/";
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


gulp.task('test', function () {
  process.env.DJANGO_ENV = 'test';
  mocha = spawn('./django/manage.py', ['test'], {stdio: 'inherit'});
});


gulp.task('default', function () {
  gulp.run('test');
});


// kill servers on exit
process.on('exit', function() {
    if (django) django.kill();
    if (ember) ember.kill();
    if (mocha) mocha.kill();
    installs.forEach(function (install) { install.kill(); });
});
