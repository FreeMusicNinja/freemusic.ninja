import DS from 'ember-data';

DS.RESTAdapter.reopen({
  namespace: 'api'
});
