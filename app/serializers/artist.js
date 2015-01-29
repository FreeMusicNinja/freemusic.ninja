import DS from 'ember-data';
import DRFSerializer from './drf';

export default DRFSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    links: {embedded: 'always'},
  }
});
