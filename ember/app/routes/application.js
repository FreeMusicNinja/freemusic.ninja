import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function () {
    if (this.get('session.isAuthenticated')) {
      var authController = this.controllerFor('auth');
      authController.set('content', this.store.find('user', 'me'));
    }
  },
});
