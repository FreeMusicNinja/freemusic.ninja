import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save: function () {
      this.modelFor('user').save();
      this.transitionTo('user');
    },
  },
});
