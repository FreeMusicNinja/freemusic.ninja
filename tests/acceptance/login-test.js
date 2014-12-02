import Ember from 'ember';
import startApp from '../helpers/start-app';
var App;

module('Acceptance: Login tests', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    Ember.$.mockjax.clear();
  }
});

test('user gives good credentials and receives welcome message', function() {
  expect(2);
  $.mockjax({
    url: "http://api/api-token-auth/",
    contentType: "application/json",
    responseText: {token: "TOKEN"},
    onAfterComplete: function () {
      ok(true);
    },
  });
  $.mockjax({
    url: "http://api/users/me/",
    contentType: "application/json",
    responseText: {id: 1, name: "Trey Hunner"},
    onAfterComplete: function () {
      var welcomeMessage = find('.navbar-right').text();
      ok(welcomeMessage.indexOf("Welcome, Trey Hunner") > -1, "User name was not displayed");
    },
  });

  visit('/login').then(function() {
    fillIn('#identification', 'trey@treyhunner.com');
    fillIn('#password', 'valid');
    click('[type=submit]');
  });
});

test('user gives bad credentials and receives error', function() {
  expect(1);
  $.mockjax({
    url: "http://api/api-token-auth/",
    status: 400,
    contentType: "application/json",
    responseText: {"non_field_errors": ["Unable to login with provided credentials."]},
  });

  visit('/login').then(function() {
    fillIn('#identification', 'trey@treyhunner.com');
    fillIn('#password', 'valid');
    click('[type=submit]');
  }).then(function () {
    var errorMessage = find('.alert-danger').text();
    ok(errorMessage.indexOf("Email or password invalid.") > -1, "Error message not displayed.");
  });
});
