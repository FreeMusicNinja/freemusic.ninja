import Ember from 'ember';

module('link-li test');

test('changing colors', function(){
  var BlankComponent = Ember.Component.extend();
  var container = new Ember.Container();
  container.register('component:link-to', BlankComponent);
  var template = Ember.Handlebars.compile(
    '{{#link-li viewName="testComponent"}}' +
    '{{#link-to viewName="linkToComponent"}}{{/link-to}}' +
    '{{/link-li}}'
  );
  var view = Ember.View.createWithMixins({template: template});
  view.render();

  var linkLi = view.get('testComponent');
  var linkTo = view.get('testComponent.linkToComponent');

  equal(linkLi.active, true);

});
