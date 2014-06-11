import Ember from 'ember';

export default Ember.ArrayController.extend({
  search: '',
  actions: {
    query: function() {
      var query = this.get('search');
      this.store.find('artist', {name: query});
    },
  },
});
