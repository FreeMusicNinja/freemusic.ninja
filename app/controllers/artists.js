import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['name'],
  name: null,
  nameChanged: function () {
    this.set('model', this.store.find('artist', {name: this.get('name')}));
    this.set('query', this.get('name'));
  }.observes('name'),
  results: function () {
    return this.get('model');
  }.property('name', 'model.@each'),
  actions: {
    query: function() {
      this.set('name', this.get('query'));
    },
  },
});
