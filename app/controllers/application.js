import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['auth'],
    userNameBinding: 'controllers.auth.content.name',
    isLoggedIn: function() {
      return !Ember.isEmpty(this.get('userName'));
    }.property('userName'),
});
