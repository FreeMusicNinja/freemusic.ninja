import Ember from 'ember';
import startApp from '../../helpers/start-app';

var App;

module('Acceptance: ArtistIndex', {
  setup: function() {
    App = startApp();
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
    Ember.run(App, 'destroy');
    Ember.$.mockjax.clear();
  }
});

test('visiting /artists/1/', function() {
  visit('/artists/1/');

  andThen(function() {
    equal(currentPath(), 'artist.index');
  });
});
