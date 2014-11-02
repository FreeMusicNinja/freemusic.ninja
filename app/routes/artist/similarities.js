import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('similarity', {artist: this.modelFor('artist').id});
  }
});
