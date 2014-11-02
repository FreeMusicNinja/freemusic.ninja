import DS from 'ember-data';

export default DS.Model.extend({
  cc_artist: DS.belongsTo('artist'),
  other_artist: DS.attr(),
  weight: DS.attr(),
  weights: [1, 2, 3, 4, 5],
});
