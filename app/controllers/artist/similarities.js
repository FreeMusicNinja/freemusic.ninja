import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    onEdit: function () {

      var hasBlankModel = this.get('content').some(function (model) {
        return !model.get('other_artist');
      });

      if (!hasBlankModel) {
        var similarity = this.store.createRecord('similarity', {
          cc_artist: this.get('artist'),
        });
        this.get('content').pushObject(similarity);
      }

    },
  },
});
