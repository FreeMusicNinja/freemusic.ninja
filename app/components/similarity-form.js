import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({

  classNames: ['edit-similarity'],
  isNewBinding: 'model.isNew',
  isSavingBinding: 'model.isSaving',
  classNameBindings: ['isNew', 'isSaving'],

  model: function () {
    return this.get('content.content');
  }.property('content'),

  other_artist: function () {
    return this.get('content.other_artist');
  }.property(),
  weight: function () {
    return this.get('content.weight');
  }.property(),

  autoSave: function () {
    if (this.get('content.hasBufferedChanges') && !this.get('model.isSaving')) {
      this.get('content').applyBufferedChanges();
      this.get('model').save();
    }
  },

  debouncedSave: function () {
    this.set('content.other_artist', this.get('other_artist'));
    this.set('content.weight', this.get('weight'));
    Ember.run.debounce(this, this.autoSave, config.APP.debounceMilliseconds);
  }.observes('other_artist', 'weight'),

  actions: {
    onChange: function () {
      this.sendAction('edit');
    },
    delete: function () {
      if (!this.get('model.isNew') && !this.get('model.isSaving')) {
        this.sendAction('delete', this.get('content'));
        this.get('model').destroyRecord();
      }
    },
  },

});
