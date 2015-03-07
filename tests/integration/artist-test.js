import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module("Artist recommendation tests", {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, App.destroy);
    Ember.$.mockjax.clear();
  }
});

test("no similar artists", function(assert) {
  assert.expect(1);
  $.mockjax({
    url: 'http://api/artists/',
    contentType: 'application/json',
    responseText: [],
  });
  visit('/artists?name=Unknown').then(function() {
    assert.equal(find('.panel').text().trim(), 'No artist found.', "Empty artist results text not found.");
  });
});

test("similar artists via URL", function(assert) {
  assert.expect(1);
  $.mockjax({
    url: 'http://api/artists/',
    contentType: 'application/json',
    responseText: [{
      id: 1,
      name: "Jonathan Coulton",
      links: [],
    }],
    onAfterComplete: function () {
      assert.equal(find('.panel').text().trim(), 'Jonathan Coulton', "Artist results not found.");
    },
  });
  visit('/artists?name=Weird+Al+Yankovic');
});
