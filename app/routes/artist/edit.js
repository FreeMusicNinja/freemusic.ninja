import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('artist');
  },
  actions: {
    save: function () {
      var artist = this.model();
      artist.save();
      this.transitionTo('artist', artist);
    },
  },
});
