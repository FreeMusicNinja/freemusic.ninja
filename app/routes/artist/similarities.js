import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function () {
    return this.store.find('similarity', {artist: this.modelFor('artist').id});
  },
  setupController: function (controller, model) {
    controller.set('artist', this.modelFor('artist'));
    controller.set('model', model);
  },
});
