import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

module('Login tests', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    Ember.$.mockjax.clear();
  }
});

test("user gives good credentials and receives token", function() {
  expect(3);
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
      ok(true);
      ok(find('.navbar-right').text().indexOf("Welcome, Trey Hunner") > -1, "User name was not displayed");
    },
  });

  visit('/login').then(function() {
    fillIn('#identification', 'trey@treyhunner.com');
    fillIn('#password', 'valid');
    click('[type=submit]');
  });
});
