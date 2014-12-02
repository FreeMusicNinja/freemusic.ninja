import Ember from 'ember';
import startApp from '../../helpers/start-app';

var App;

module('Acceptance: ArtistSimilarities', {
  setup: function() {
    App = startApp();
    Ember.$.mockjax({
      url: 'http://api/users/me/',
      contentType: 'application/json',
      responseText: {
        id: 1,
        name: "Trey",
        email: "trey@example.com",
      },
    });
    Ember.$.mockjax({
      url: 'http://api/artists/1/',
      contentType: 'application/json',
      responseText: {
        id: 1,
        name: "Jonathan Coulton",
        links: [],
      },
    });
    Ember.$.mockjax({
      url: 'http://api/similar/',
      contentType: 'application/json',
      responseText: [{
        id: 1,
        other_artist: "Jonathan Coulton",
        cc_artist: 1,
        weight: 3.0,
      }],
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    Ember.$.mockjax.clear();
  }
});

test('viewing similarities while authenticated', function() {
  expect(2);
  authenticateSession();
  visit('/artists/1/similarities');

  andThen(function() {
    equal(currentPath(), 'artist.similarities');
    var lead = find('.lead').text().trim();
    equal(lead, 'Please list all artists you think are similar to Jonathan Coulton.', "Artist similarities not found");
  });
});
