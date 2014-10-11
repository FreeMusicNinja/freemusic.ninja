import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('errorMessage', null);
  },
  actions: {
    sessionAuthenticationFailed: function() {
      this.controller.set('errorMessage', "Email or password invalid.");
    },
  },
});
