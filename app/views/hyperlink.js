import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'hyperlink',
  classNameBindings: ['elementId'],
  linkOptions: function () {
    return [
      // FIXME This is currently copy-pasted from the Django hyperlink model
      {name: 'bandcamp', display_name: "Bandcamp"},
      {name: 'jamendo', display_name: "Jamendo"},
      {name: 'magnatune', display_name: "Magnatune"},
      {name: 'fma', display_name: "Free Music Archive"},
      {name: 'homepage', display_name: "Homepage"},
    ];
  }.property(),
  elementId: function () {
    return "link-%@".fmt(this.get('content.id'));
  }.property('content.id'),
});
