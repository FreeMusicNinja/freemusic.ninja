import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Ember.ArrayController.extend({

  addBlankModel: function () {
    var similarity = this.store.createRecord('similarity', {
      cc_artist: this.get('artist'),
      other_artist: '',
      weight: 1,
    });
    this.get('content').pushObject(BufferedProxy.create({
      content: similarity,
    }));
  },

  actions: {
    onEdit: function () {
      var hasBlankModel = this.get('content').some(function (model) {
        return !model.get('other_artist');
      });
      if (!hasBlankModel) {
        this.addBlankModel();
      }
    },
    onDelete: function (object) {
      this.get('content').removeObject(object);
    },
  },

});
