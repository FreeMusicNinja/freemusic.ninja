import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('errorMessage', null);
  },
  actions: {
    sessionAuthenticationSucceeded: function() {
      this.controller.set('errorMessage', null);
      this.target.send('sessionAuthenticationSucceeded', arguments);
    },
    sessionAuthenticationFailed: function() {
      this.controller.set('errorMessage', "Email or password invalid.");
    },
  },
});
