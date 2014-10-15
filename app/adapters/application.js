import config from '../config/environment';
import DS from 'ember-data';


export default DS.DjangoRESTAdapter.extend({
  host: config.APP.API_HOST,
  namespace: config.APP.API_NAMESPACE,
});
