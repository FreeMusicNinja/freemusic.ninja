import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

module("Artist recommendation tests", {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    Ember.$.mockjax.clear();
  }
});

test("no similar artists", function() {
  expect(1);
  $.mockjax({
    url: 'http://api/artists?name=Unknown',
    contentType: 'application/json',
    responseText: [],
  });
  visit('/artists?name=Unknown').then(function() {
    equal(find('.panel').text().trim(), 'No artist found.', "Empty artist results text not found.");
  });
});
