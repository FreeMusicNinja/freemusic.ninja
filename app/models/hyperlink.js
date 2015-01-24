import DS from 'ember-data';

export default DS.Model.extend({
  display_name: DS.attr('string'),
  name: DS.attr('string'),
  url: DS.attr('string'),
  artist: DS.belongsTo('artist'),
});
