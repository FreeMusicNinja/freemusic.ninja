import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('artists');
  this.resource('resources');
  this.resource('donate');
});

export default Router;
