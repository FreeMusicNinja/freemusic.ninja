import Ember from 'ember';

export default Ember.ObjectController.extend({
  similarities: function () {
    return this.store.find('similarity', {artist: this.get('content.id')});
  }.property('content'),
});
