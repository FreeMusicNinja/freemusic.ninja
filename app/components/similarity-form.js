import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Ember.Component.extend({

  model: function () {
    return BufferedProxy.create({content: this.get('content')});
  }.property('content'),

  other_artist: function () {
    return this.get('model.other_artist');
  }.property(),
  weight: function () {
    return this.get('model.weight');
  }.property(),

  autoSave: function () {
    if (this.get('model.hasBufferedChanges') && !this.get('content.isSaving')) {
      this.get('model').applyBufferedChanges();
      this.get('content').save();
    }
  },

  debouncedSave: function () {
    this.set('model.other_artist', this.get('other_artist'));
    this.set('model.weight', this.get('weight'));
    Ember.run.debounce(this, this.autoSave, 1000);
  }.observes('other_artist', 'weight'),

  actions: {
    onChange: function () {
      this.sendAction('edit');
    },
  },

});
