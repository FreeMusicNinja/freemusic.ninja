import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: MusicfinderENV.EmberENV.apiHost,
});
