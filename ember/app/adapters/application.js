import DS from 'ember-data';


export default DS.DjangoRESTAdapter.extend({
  host: MusicfinderENV.APP.API_HOST,
  namespace: MusicfinderENV.APP.API_NAMESPACE,
});
