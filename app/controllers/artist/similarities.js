import Ember from 'ember';

export default Ember.ArrayController.extend({

  addBlankModel: function () {
    var similarity = this.store.createRecord('similarity', {
      cc_artist: this.get('artist'),
      other_artist: '',
      weight: 1,
    });
    this.get('content').pushObject(similarity);
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
  },

});
