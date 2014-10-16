import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['name'],
  name: null,
  nameChanged: function () {
    var model = this.store.find('artist', {name: this.get('name')});
    var controller = this;
    model.then(function() {
      controller.set('loading', false);
    });
    this.set('loading', true);
    this.set('model', model);
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
