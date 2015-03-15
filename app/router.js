import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('artists');
  this.resource('artist', { path: '/artists/:artist_id' }, function () {
    this.route('edit');
  });
  this.route('resources');
  this.route('donate');
  this.route('login');
});

export default Router;
