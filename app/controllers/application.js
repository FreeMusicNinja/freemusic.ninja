import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['auth'],
    userBinding: 'controllers.auth.content',
    isLoggedIn: function() {
      return !Ember.isEmpty(this.get('user.name'));
    }.property('user.name'),
});
