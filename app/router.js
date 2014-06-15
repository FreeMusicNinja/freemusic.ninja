import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MusicfinderENV.locationType
});

Router.map(function() {
  this.resource('artists');
});

export default Router;
