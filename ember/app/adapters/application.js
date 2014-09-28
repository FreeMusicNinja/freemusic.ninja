import DS from 'ember-data';


export default DS.DjangoRESTAdapter.extend({
  host: FreeMusicNinjaENV.APP.API_HOST,
  namespace: FreeMusicNinjaENV.APP.API_NAMESPACE,
});
