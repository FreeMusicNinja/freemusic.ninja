import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['input-group-btn'],
  selectedOption: function() {
    if (Ember.isEmpty(this.get('value'))) {
      return { name: '', display_name: 'Choose One' };
    } else {
      return this.get('options').findBy('name', this.get('value'));
    }
  }.property('options', 'value'),

  actions: {
    select: function(opt) {
      this.set('value', opt.name);
    }
  }
});
