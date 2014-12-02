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
  },
  teardown: function() {
    invalidateSession();
    Ember.run(App, 'destroy');
    Ember.$.mockjax.clear();
  }
});

test('viewing similarities while authenticated', function() {
  expect(2);
  Ember.$.mockjax({
    url: 'http://api/similar/',
    contentType: 'application/json',
    responseText: [],
  });
  authenticateSession();
  visit('/artists/1/similarities');

  andThen(function() {
    equal(currentPath(), 'artist.similarities');
    var lead = find('.lead').text().trim();
    equal(lead, 'Please list all artists you think are similar to Jonathan Coulton.', "Artist similarities not found");
  });
});

test('viewing similarities while unauthenticated', function() {
  expect(1);
  visit('/artists/1/similarities');

  andThen(function() {
    equal(currentPath(), 'login');
  });
});

test('updating similarity', function() {
  expect(6);
  Ember.$.mockjax({
    url: 'http://api/similar/',
    type: 'GET',
    contentType: 'application/json',
    responseText: [{
      id: 1,
      other_artist: "They Might Be Giants",
      cc_artist: 1,
      weight: 3.0,
    }],
    onAfterComplete: function () {
      ok('Similarities listed');
    }
  });
  Ember.$.mockjax({
    url: 'http://api/similar/1/',
    type: 'PUT',
    contentType: 'application/json',
    onAfterComplete: function () {
      ok('Similarity updated');
    }
  });
  authenticateSession();
  visit('/artists/1/similarities');

  andThen(function() {
    var artistFields = find('.edit-similarity input[type=text]');
    equal(artistFields.length, 2);
    equal(artistFields[0].value, "They Might Be Giants");
    equal(artistFields[1].value, "");
    fillIn('.edit-similarity:first input[type=text]', "New Name");
    equal(artistFields.first().val(), "New Name");
  });
});

test('adding new similarity', function() {
  expect(7);
  Ember.$.mockjax({
    url: 'http://api/similar/',
    type: 'GET',
    contentType: 'application/json',
    responseText: [],
    onAfterComplete: function () {
      ok(true, 'Similarities listed');
    }
  });
  Ember.$.mockjax({
    url: 'http://api/similar/',
    type: 'POST',
    contentType: 'application/json',
    onAfterComplete: function () {
      ok(true, 'Similarity created');
    }
  });
  authenticateSession();
  visit('/artists/1/similarities');

  andThen(function() {
    var artistFields = find('.edit-similarity input[type=text]');
    equal(artistFields.length, 1, 'Single similarity');
    equal(artistFields[0].value, "", 'Blank Similarity');
    fillIn('.edit-similarity:first input[type=text]', "They Might Be Giants");
    artistFields.first().keypress();
    artistFields = find('.edit-similarity input[type=text]');
    equal(artistFields.length, 2);
    equal(artistFields[0].value, "They Might Be Giants");
    equal(artistFields[1].value, "", 'Blank Similarity');
  });
});
