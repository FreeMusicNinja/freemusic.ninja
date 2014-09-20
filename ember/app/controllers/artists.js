import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['name'],
  name: null,
  nameChanged: function () {
    this.set('model', this.store.find('artist', {name: this.get('name')}));
    this.set('query', this.get('name'));
  }.observes('name'),
  results: function () {
    var name = this.get('name');
    return this.get('model').filter(function(item) {
      return item.get('name').toLowerCase() === name.toLowerCase();
    });
  }.property('name', 'model.@each'),
  actions: {
    query: function() {
      this.set('name', this.get('query'));
    },
  },
});
