import DS from 'ember-data';


export default DS.RESTAdapter.extend({
  createRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });

    var artistId = record.get('artist.id');
    var url = this.buildURL(type.typeKey, artistId) + '/similar';
    return this.ajax(url, 'POST', { data: data });
  }
});
