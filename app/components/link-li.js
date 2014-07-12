// From http://discuss.emberjs.com/t/bootstrap-active-links-and-lis/5018
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
});
