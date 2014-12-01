import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function () {
    return this.store.find('similarity', {
      cc_artist: this.modelFor('artist').id,
    })
    .then(function (models) {
      return Ember.ArrayProxy.create({
        content: models.map(function (model) {
          return BufferedProxy.create({content: model});
        }),
      });
    });
  },
  setupController: function (controller, content) {
    controller.set('artist', this.modelFor('artist'));
    controller.set('content', content);
    controller.send('onEdit');
  },
});
