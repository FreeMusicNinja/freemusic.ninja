import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module('Login tests', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, App.destroy);
    Ember.$.mockjax.clear();
  }
});

test("user gives good credentials and receives welcome message", function(assert) {
  assert.expect(2);
  $.mockjax({
    url: "http://api/oauth2/token/?client_id=client_id",
    contentType: "application/json",
    responseText: {"access_token": "ACCESS", "scope": "read write", "expires_in": 36000, "refresh_token": "REFRESH", "token_type": "Bearer"},
    onAfterComplete: function () {
      assert.ok(true);
    },
  });
  $.mockjax({
    url: "http://api/users/me/",
    contentType: "application/json",
    responseText: {id: 1, name: "Trey Hunner"},
    onAfterComplete: function () {
      var welcomeMessage = find('.navbar-right').text();
      assert.ok(welcomeMessage.indexOf("Welcome, Trey Hunner") > -1, "User name was not displayed");
    },
  });

  visit('/login').then(function() {
    fillIn('#identification', 'trey@treyhunner.com');
    fillIn('#password', 'valid');
    click('[type=submit]');
  });
});

/*
 * TODO Uncomment this failing test once ember-simple-auth is fixed
 * See issue: https://github.com/simplabs/ember-simple-auth/issues/439
test("user gives bad credentials and receives error", function() {
  expect(1);
  $.mockjax({
    url: "http://api/oauth2/token/?client_id=client_id",
    status: 400,
    contentType: "application/json",
    responseText: {"error": "invalid_grant", "error_description": "Invalid credentials given."},
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
*/
