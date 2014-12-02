import Ember from 'ember';

export default Ember.ObjectController.extend({
  similarities: function () {
    return this.store.find('similarity', {cc_artist: this.get('content.id')});
  }.property('content'),
});
