import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function () {
    return this.store.find('similarity', {cc_artist: this.modelFor('artist').id});
  },
  setupController: function (controller, content) {
    controller.set('artist', this.modelFor('artist'));
    controller.set('content', content);
    controller.send('onEdit');
  },
});
