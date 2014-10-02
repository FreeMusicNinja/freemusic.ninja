import Ember from 'ember';

var Router = Ember.Router.extend({
  location: FreeMusicNinjaENV.locationType
});

Router.map(function() {
  this.resource('artists');
  this.resource('resources');
  this.resource('donate');
});

export default Router;
